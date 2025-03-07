#include <TinyGPSPlus.h>
#include <SdFat.h>
#include <MPU9250.h>
#include "eeprom_utils.h"
#include <math.h>

static const int SDPin = 10, LDRPin = A0, CTRLERPin = 7, GPSBuad = 9600;
const unsigned long UPDATE_MPU_INTERVAL = 200, UPDATE_SD_INTERVAL = 1000, UPDATE_GPS_INTERVAL = 10000, UPDATE_LDR_INTERVAL = 1000, UPDATE_CTRLER_INTERVAL = 250;
static unsigned long lastMpuUpdate = 0, lastSdUpdate = 0, lastGpsUpdate = 0, lastLdrUpdate = 0, lastCtrlerUpdate = 0, firstCtrlerInput = 0, timeMS = 0;
static int controllerState = HIGH, controllerCount = 0, dataCollectionMode = 4, previousCollectionMode = 4; // 0 = nothing, 1 = grazing, 2 = resting, 3 = sleeping, 4 = off 

TinyGPSPlus gps;
SdFs sd;
FsFile file;
MPU9250 mpu;


void setup() {
  Serial.begin(115200);
  Wire.begin();
  Wire.setClock(400000);
  pinMode(CTRLERPin, INPUT);
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

  // load from eeprom
  loadCalibration();
}

void loop() {
  unsigned long currentTime = millis();
  bool newData = mpu.update();

  if (currentTime - lastCtrlerUpdate >= UPDATE_CTRLER_INTERVAL) {
    int state = digitalRead(CTRLERPin);

    if (state != controllerState && controllerCount == 0) {
      firstCtrlerInput = currentTime;
      controllerCount++;
      controllerState = state;
    } else if (state != controllerState) {
      controllerCount++;
      controllerState = state;
    }

    if (firstCtrlerInput != 0 && currentTime - firstCtrlerInput >= 3000) {
      firstCtrlerInput = 0;
      dataCollectionMode = controllerCount - 1;
      if (dataCollectionMode > 4) dataCollectionMode = 4;
      if (dataCollectionMode != 4) previousCollectionMode = dataCollectionMode;
      controllerCount = 0; 
      Serial.print("State changed to: ");
      Serial.println(dataCollectionMode);
      // file = sd.open("log.txt", FILE_WRITE);

      // if (file) {
      //   file.print("Changed state to: ");
      //   file.println(dataCollectionMode);

      //   file.close();
      // }
    }
  }
  
  if ((currentTime - lastMpuUpdate >= UPDATE_MPU_INTERVAL && newData && dataCollectionMode != 4) || (currentTime - lastMpuUpdate >= UPDATE_MPU_INTERVAL && newData && dataCollectionMode == 4 && timeMS % 10000 != 200 && timeMS != 0)) {
    file = sd.open("data.csv", FILE_WRITE);

    if (file) {
      //qxdisplayMPUInfo();
      //Serial.println(timeMS);
      file.print(timeMS);
      file.print(',');
      file.print(roundToN(mpu.getAccX() / 2.0, 3));
      file.print(',');
      file.print(roundToN(mpu.getAccY() / 2.0, 3));
      file.print(',');
      file.print(roundToN(mpu.getAccZ() / 2.0, 3));
      file.print(',');
      file.print(roundToN(mpu.getGyroX() / 250.0, 3));
      file.print(',');
      file.print(roundToN(mpu.getGyroY() / 250.0, 3));
      file.print(',');
      file.print(roundToN(mpu.getGyroZ() / 250.0, 3));
      file.print(',');
      file.print(roundToN(((mpu.getPitch() + 180.0) / 360.0) * 2.0 - 1.0, 3));
      file.print(',');
      file.print(roundToN(((mpu.getRoll() + 180.0) / 360.0) * 2.0 - 1.0, 3));
      file.print(',');
      timeMS += 200;

      String label;

      switch(previousCollectionMode) {
        case 0:
          label = "nothing";
          break;
        case 1:
          label = "grazing";
          break;
        case 2:
          label = "resting";
          break;
        case 3:
          label = "sleeping";
          break;
      }

      file.println(label);
    //   sd.print("Yaw, Pitch, Roll: ");
    //   sd.print(mpu.getYaw(), 2);
    //   sd.print(", ");
    //   sd.print(mpu.getPitch(), 2);
    //   sd.print(", ");
    //   sd.println(mpu.getRoll(), 2);

      file.close();
    //   lastMpuUpdate = currentTime;
    // } else {
    //   Serial.println("error opening test.txt");
    }
    
    lastMpuUpdate = currentTime;
    // static uint32_t prev_ms = millis(); // static to retain value between multiple loops
    // if (millis() > prev_ms + 1000) {
    //     printMPUInfo();
    //     prev_ms = millis();
  }

  // if (currentTime - lastSdUpdate >= UPDATE_SD_INTERVAL) {
  // //   sd = SD.open("test.txt", FILE_READ);
  // //   if (sd) {
  // //     Serial.println("test.txt:");
  
  // //     while (sd.available()) {
  // //       Serial.write(sd.read());
  // //     }
      
  // //     sd.close();
  // //     lastSdUpdate = currentTime;
  // //   } else {
  // //     Serial.println("error opening test.txt");
  // //   }
  // }

  // if (currentTime - lastGpsUpdate >= UPDATE_GPS_INTERVAL && Serial1.available() > 0) {
  //   // while (Serial1.available() > 0) {
  //   //   gps.encode(Serial1.read());
  //   // }
  
  //   // // If we just got a valid fix (or any updated data)
  //   // displayGPSInfo();

  //   // if (millis() > 5000 && gps.charsProcessed() < 10)
  //   // {
  //   //   Serial.println(F("No GPS detected: check wiring."));
  //   //   while(true);
  //   // }

  //   // lastGpsUpdate = currentTime;
  // }

  if (currentTime - lastLdrUpdate >= UPDATE_LDR_INTERVAL) {
    Serial.println(analogRead(LDRPin)); // in light value should be around 150-100 for intense 200 for not intense
    // file = sd.open("log.txt", FILE_WRITE);

    // if (file) {
    //   file.print("Changed state to: ");
    //   file.println(dataCollectionMode);

    //   file.close();
    // }
    // lastLdrUpdate = currentTime;
  }
  
  // if (mpu.update()) {
  //   static uint32_t prev_ms = millis(); // static to retain value between multiple loops
  //   if (millis() > prev_ms + 1000) {
  //       printMPUInfo();
  //       prev_ms = millis();
  //   }
  // }

  delay(1);
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

void displayMPUInfo() {
    Serial.print("Yaw, Pitch, Roll: "); //print to 2 decimals - when collecting data will most likely use 1 or 2 decimals.
    Serial.print(mpu.getYaw(), 2);
    Serial.print(", ");
    Serial.print(mpu.getPitch(), 2);
    Serial.print(", ");
    Serial.println(mpu.getRoll(), 2);

    Serial.print("Acceleration - X, Y, Z: ");
    Serial.print(mpu.getAccX(), 2);
    Serial.print(", ");
    Serial.print(mpu.getAccY(), 2);
    Serial.print(", ");
    Serial.println(mpu.getAccZ(), 2);

    Serial.print("Orientation - X, Y, Z: ");
    Serial.print(mpu.getGyroX(), 2);
    Serial.print(", ");
    Serial.print(mpu.getGyroY(), 2);
    Serial.print(", ");
    Serial.println(mpu.getGyroZ(), 2);

    Serial.print("Temperature: ");
    Serial.print(mpu.getTemperature(), 2);
    Serial.println(" C");
}

void displayGPSInfo()
{
  Serial.print(F("Location: ")); 
  if (gps.location.isValid())
  {
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F("  Date/Time: "));
  if (gps.date.isValid())
  {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F(" "));
  if (gps.time.isValid())
  {
    if (gps.time.hour() < 10) Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(F(":"));
    if (gps.time.minute() < 10) Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));
    if (gps.time.second() < 10) Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));
    if (gps.time.centisecond() < 10) Serial.print(F("0"));
    Serial.print(gps.time.centisecond());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.println();
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