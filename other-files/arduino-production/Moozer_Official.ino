#include <WiFiS3.h>
#include <RyanBestDev-project-1_inferencing.h>
#include <TinyGPSPlus.h>
#include <SdFat.h>
#include <MPU9250.h>
#include "eeprom_utils.h"
#include <math.h>

static const int SDPin = 10, LDRPin = A0, GPSBuad = 9600, httpsPort = 80;
const unsigned long UPDATE_MPU_INTERVAL = 200, UPDATE_SD_INTERVAL = 1000, UPDATE_GPS_INTERVAL = 10000, UPDATE_LDR_INTERVAL = 1000;
static unsigned long lastMpuUpdate = 0, lastSdUpdate = 0, lastGpsUpdate = 0, lastLdrUpdate = 0;

const float ANOMALY_THRESHOLD = 0.3, PREDICTION_THRESHOLD = 0.6;
const char CATTLE_ID[] = "";
const char ssid[] = "";
const char password[] = "";
const char host[] = "moozer.us";

int dataCount = 0;

float input_data[400]; // Array to store 50 samples, each with 8 axes

TinyGPSPlus gps;
SdFs sd;
FsFile file;
MPU9250 mpu;
WiFiClient client;


void setup() {
  Serial.begin(115200);
  Wire.begin();
  Wire.setClock(400000);
  Serial1.begin(GPSBuad);     // GPS on pins 0(RX), 1(TX)
  delay(2000);

  while (!Serial);
  
  if (!sd.begin(SDPin, SD_SCK_MHZ(22))) {
    Serial.println("SD card initialization failed!");
    while (true);
  }
  Serial.println("SD card initialization done.");

  MPU9250Setting setting;
  setting.accel_fs_sel = ACCEL_FS_SEL::A2G;
  setting.gyro_fs_sel = GYRO_FS_SEL::G250DPS;
  setting.mag_output_bits = MAG_OUTPUT_BITS::M16BITS;
  setting.fifo_sample_rate = FIFO_SAMPLE_RATE::SMPL_200HZ;
  setting.gyro_fchoice = 0x03;
  setting.gyro_dlpf_cfg = GYRO_DLPF_CFG::DLPF_41HZ;
  setting.accel_fchoice = 0x01;
  setting.accel_dlpf_cfg = ACCEL_DLPF_CFG::DLPF_45HZ;
  
  if (!mpu.setup(0x68, setting)) {
      while (1) {
          Serial.println("MPU connection failed. Please check your connection with `connection_check` example.");
          delay(5000);
      }
  }

  //runMPUCalibration(); // only uncomment if using an MPU for the first time.
  //ei_impulse_init();

  // load from eeprom
  loadCalibration();
}

void loop() {
  //  collect 50 samples at 200ms intervals.
  unsigned long startTime = millis(); // subtract to get 20s intervals
  int sampleCount = 50;
  int index = 0;    // index in array
  float temp = -100.0;

  wakeGPS();
  mpu.sleep(false);
  
  while (sampleCount > 0) {
    unsigned long currentTime = millis();
    bool newData = mpu.update();

    if (currentTime - lastMpuUpdate >= UPDATE_MPU_INTERVAL && newData) {
      float accX = roundToN(mpu.getAccX() / 2.0, 3);
      float accY = roundToN(mpu.getAccY() / 2.0, 3);
      float accZ = roundToN(mpu.getAccZ() / 2.0, 3);
      float gyrX = roundToN(mpu.getGyroX() / 250.0, 3);
      float gyrY = roundToN(mpu.getGyroY() / 250.0, 3);
      float gyrZ = roundToN(mpu.getGyroZ() / 250.0, 3);
      float normPitch = roundToN(((mpu.getPitch() + 180.0) / 360.0) * 2.0 - 1.0, 3);
      float normRoll  = roundToN(((mpu.getRoll() + 180.0) / 360.0) * 2.0 - 1.0, 3);

      if (temp == -100.0) {
        temp = roundToN(mpu.getTemperature(), 2);
      }

      input_data[index++] = accX;
      input_data[index++] = accY;
      input_data[index++] = accZ;
      input_data[index++] = gyrX;
      input_data[index++] = gyrY;
      input_data[index++] = gyrZ;
      input_data[index++] = normPitch;
      input_data[index++] = normRoll;

      lastMpuUpdate = currentTime;
      sampleCount--;
    }

    delay(2);
  }

  // Once we have 50 samples (400 values), create an Edge Impulse signal.
  String dataString = "other";
  ei::signal_t signal;
  int err = numpy::signal_from_buffer(input_data, EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE, &signal);

  if (err == 0) {
    // Run the classifier with the signal
    ei_impulse_result_t result = { 0 };
    err = run_classifier(&signal, &result, false);
    
    if (err == EI_IMPULSE_OK) {
      
      if (result.anomaly <= ANOMALY_THRESHOLD) {
        for (int i = 0; i < EI_CLASSIFIER_LABEL_COUNT; i++) {
          if (result.classification[i].value >= PREDICTION_THRESHOLD) {
            dataString = result.classification[i].label;
          }
        }
      } 
      
    }
  }

  while (Serial1.available() > 0) {
    gps.encode(Serial1.read());
  }

  dataString += "_" + String(temp) + "_" + getGPSInfo() + "_" + String(getLDRValue());

  Serial.println(dataString);

  sleepGPS();
  mpu.sleep(true);

  file = sd.open("data.txt", FILE_WRITE);

  if (file) {
    file.println(dataString);

    file.close();

    if (dataCount < 60) {
      dataCount++;
    }

    if (dataCount >= 30) {
      WiFi.begin(ssid, password);
      
      int count = 0;
  
      while (WiFi.status() != WL_CONNECTED && count < 5) {
        delay(500);
        count++;
      }
  
      if(WiFi.status() == WL_CONNECTED) { // connected
        client.stop();
        delay(2500);
  
        if (!client.connect(host, httpsPort)) {
          delay(calculateDelay(startTime));
          return;
        }

        Serial.println("connected to wifi");
  
        String jsonData = "[";
        file = sd.open("data.txt", O_READ);
        if (!file) {
          delay(calculateDelay(startTime));
          return;
        }
        
        char buffer[128];
        bool firstLine = true;
        int lineCount = 0;
        while (file.fgets(buffer, sizeof(buffer)) != NULL && lineCount < dataCount) {
          // Convert buffer to a String
          String line = String(buffer);
          line.trim();
          line.replace("\n", "");
          line.replace("\r", "");
          
          if (line.length() > 0) {
            if (!firstLine) {
              jsonData += ",";
            }
            
            if (firstLine) {
              jsonData += "\"" + line + "_" + String(CATTLE_ID) + "\"";
            } else {
              jsonData += "\"" + line + "\"";
            }
            firstLine = false;
          }
          lineCount++;
        }
        jsonData += "]";
        file.close();

        client.println("POST /server/api/cattle/new-cattle HTTP/1.1");
        client.print("Host: ");
        client.println(host);
        client.println("Content-Type: application/json");
        client.print("Content-Length: ");
        client.println(jsonData.length());
        client.println("Connection: close");
        client.println();  // End of headers
        client.println(jsonData);  // JSON payload

        int statusCode;

        if (client.connected() || client.available()) {
          // Discard any extraneous characters until we see 'H'
          char c;
          while ((client.connected() || client.available()) && client.peek() != 'H') {
            client.read();
          }
          
          String statusLine = "";
          while (client.connected() || client.available()) {
            c = client.read();
            if (c == '\n') {
              break;
            }
            statusLine += c;
          }
          Serial.println(statusLine);
        
          if (statusLine.startsWith("HTTP/1.1 ") || statusLine.startsWith("HTTP/1.0 ")) {
            
            // Extract the characters representing the status code (assumed to be at positions 9 to 11)
            String codeString = "";
            for (int i = 9; i < 12 && i < statusLine.length(); i++) {
              codeString += statusLine[i];
            }
            codeString.trim();
            statusCode = codeString.toInt();
          }
        }

        client.stop();

        Serial.println(statusCode);

        if (!statusCode || statusCode != 200) {
          delay(calculateDelay(startTime));
          return;
        }

        Serial.println("Deleting txt..");

        
        deleteFirstNLines("data.txt", dataCount);

        int numLines = countLines("data.txt");

        if (numLines >= 60) {
          dataCount = 60;
        } else {
          dataCount = numLines;
        }

        Serial.print("Num Of Lines: ");
        Serial.println(dataCount);
      }
    }
  }

  WiFi.disconnect();
  
  delay(calculateDelay(startTime));
  unsigned long elapsed = (millis() >= startTime) ? (millis() - startTime) : (startTime - millis());
  Serial.print("Time elapsed: ");
  Serial.println(elapsed);
}

void runMPUCalibration() {
  #if defined(ESP_PLATFORM) || defined(ESP8266)
    EEPROM.begin(0x80);
  #endif

  delay(5000);

  // calibrate anytime you want to
  Serial.println("Accel Gyro calibration will start in 5sec.");
  Serial.println("Please leave the device still on the flat plane.");
  mpu.verbose(true);
  delay(5000);
  mpu.calibrateAccelGyro();

  Serial.println("Mag calibration will start in 5sec.");
  Serial.println("Please Wave device in a figure eight until done.");
  delay(5000);
  mpu.calibrateMag();

  mpu.verbose(false);

  // save to eeprom
  saveCalibration();
}



int getLDRValue() {
  int val = analogRead(LDRPin);

  if (val <= 175) {
    return 2;
  }  else if (val <= 300) {
    return 1;
  } else {
    return 0;
  }
}


String getGPSInfo()
{
  String GPS_INFO = "";
  
  // Append latitude and longitude (rounded to 6 decimal places)
  if (gps.location.isValid()) {
    GPS_INFO += String(roundToN(gps.location.lat(), 6)) + "_";
    GPS_INFO += String(roundToN(gps.location.lng(), 6)) + "_";
  } else {
    GPS_INFO += "0_0_";
  }
  
  // Append ISO8601 timestamp if both date and time are valid
  if (gps.date.isValid() && gps.time.isValid())
  {
    int year = gps.date.year();
    int month = gps.date.month();
    int day = gps.date.day();
    int hour = gps.time.hour();
    int minute = gps.time.minute();
    int second = gps.time.second();
    

    char timestamp[25];
    sprintf(timestamp, "%04d-%02d-%02dT%02d:%02d:%02dZ", year, month, day, hour, minute, second);
    
    GPS_INFO += timestamp;
  } else {
    GPS_INFO += "INVALID";
  }
  
  return GPS_INFO;
}


float roundToN(float value, int decimals) {
  // Calculate a scaling factor of 10^(decimals)
  float scale = 1.0;
  for (int i = 0; i < decimals; i++) {
    scale *= 10.0;
  }

  // Multiply, round, then divide by the scale
  return roundf(value * scale) / scale;
}



unsigned long calculateDelay(unsigned long startTime) {
  if (millis() - startTime < 30000) {
       return (30000 - (millis() - startTime));
  }

  return 0;
}


// Deletes the first 'n' lines from the given file.
void deleteFirstNLines(const char* filename, int n) {
  FsFile originalFile = sd.open(filename, O_READ);
  if (!originalFile) {
    Serial.println("Failed to open original file.");
    return;
  }
  
  FsFile tempFile = sd.open("temp.txt", O_CREAT | O_WRITE);
  if (!tempFile) {
    Serial.println("Failed to open temp file.");
    originalFile.close();
    return;
  }
  
  int lineCount = 0;
  char buffer[128];
  while (originalFile.fgets(buffer, sizeof(buffer)) != NULL) {
    if (lineCount >= n) {
      // Use print() to avoid adding an extra newline.
      tempFile.print(buffer);
    }
    lineCount++;
  }
  
  originalFile.close();
  tempFile.close();
  
  sd.remove(filename);
  sd.rename("temp.txt", filename);
  Serial.println("Deleted first N lines successfully!");
}


// Counts the total number of lines in the given file.
int countLines(const char* filename) {
  file = sd.open(filename, O_READ);
  if (!file) {
    Serial.println("Failed to open file for counting lines.");
    return -1;
  }
  
  int count = 0;
  char buffer[128];
  while (file.fgets(buffer, sizeof(buffer)) != NULL) {
    count++;
  }
  file.close();
  return count;
}


// Put the GT-U7 GPS to sleep.
void sleepGPS() {
  Serial1.println("$PMTK161,0*28");
}

// Wake up the GT-U7 GPS.
void wakeGPS() {
  Serial1.println("$PMTK010,002*2C");
}
