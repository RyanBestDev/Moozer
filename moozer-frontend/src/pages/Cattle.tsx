import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { GiCow } from 'react-icons/gi';
import DashboardHeader from '@/components/DashboardHeader';
import { IoStatsChartOutline } from 'react-icons/io5';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { MapContainer, TileLayer, CircleMarker, Popup, LayerGroup } from 'react-leaflet';
import { nanoid } from 'nanoid';
import 'chartjs-adapter-date-fns';
import 'leaflet/dist/leaflet.css';

Chart.register(zoomPlugin);

export default function Cattle() {
	const { cattleId } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [labels, setLabels] = useState<string[]>([]);
	const [lightData, setLightData] = useState<any[]>([]);
	const [temperatureData, setTemperatureData] = useState<any[]>([]);
	const [mapData, setMapData] = useState<any[]>([]);
	const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
	const [minutesInModerateLight, setMinutesInModerateLight] = useState<number>(0);
	const [minutesInIntenseLight, setMinutesInIntenseLight] = useState<number>(0);
	const [minutesInLowLight, setMinutesInLowLight] = useState<number>(0);
	const [lowestTemperature, setLowestTemperature] = useState<number>(0);
	const [greatestTemperature, setGreatestTemperature] = useState<number>(0);
	const [averageTemperature, setAverageTemperature] = useState<number>(0);
	const [minutesGrazing, setMinutesGrazing] = useState<number>(0);
	const [minutesResting, setMinutesResting] = useState<number>(0);
	const [minutesOther, setMinutesOther] = useState<number>(0);
	const [behaviorData, setBehaviorData] = useState<any[]>([]);
	const [minTime, setMinTime] = useState<number>(0);
	const [maxTime, setMaxTime] = useState<number>(0);

	useEffect(() => {
		if (loading === false) {
			Chart.defaults.font.family = 'Figtree';
			const lightChart = document.getElementById('light-chart') as HTMLCanvasElement;
			if (lightChart) {
				const chart = new Chart(lightChart, {
					type: 'line',
					data: {
						labels: labels,
						datasets: [
							{
								label: 'Light Level',
								data: lightData,
								stepped: true,
								backgroundColor: '#28b463',
								borderColor: '#28b463',
							},
						],
					},

					options: {
						responsive: true,
						maintainAspectRatio: false,
						scales: {
							x: {
								grid: {
									color: '#3f3f3f',
								},
								position: 'bottom',
								type: 'time',
								time: {
									tooltipFormat: 'yyyy-MM-dd HH:mm:ss', // Display local time in tooltip
									displayFormats: {
										hour: 'HH:mm',
										minute: 'HH:mm',
										second: 'HH:mm:ss',
									},
								},
								min: minTime,
								max: maxTime,
								bounds: 'ticks', // Ensures it only shows actual ticks

								ticks: {
									autoSkip: false,
									maxTicksLimit: 10,
									autoSkipPadding: 50,
									maxRotation: 0,
									callback: (value) => {
										return new Date(value).toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
											second: '2-digit',
										}); // Convert timestamps to local time
									},
								},
							},
							y: {
								grid: {
									color: '#3f3f3f',
								},
								ticks: {
									maxTicksLimit: 3,
								},
							},
						},
						plugins: {
							zoom: {
								zoom: {
									wheel: {
										enabled: true,
									},
									pinch: {
										enabled: true,
									},
									mode: 'x',
									drag: {
										enabled: true,
									},
								},
							},
						},
					},
				});

				if (
					chart.options.color &&
					chart.options.scales &&
					chart.options.scales.x &&
					chart.options.scales.x.ticks &&
					chart.options.scales.x.ticks.color &&
					chart.options.scales.y &&
					chart.options.scales.y.ticks &&
					chart.options.scales.y.ticks.color
				) {
					chart.options.color = '#000000';
					chart.options.scales.x.ticks.color = '#000000';
					chart.options.scales.y.ticks.color = '#000000';
					chart.update();
				}
			}

			const temperatureChart = document.getElementById('temperature-chart') as HTMLCanvasElement;
			if (temperatureChart) {
				const chart = new Chart(temperatureChart, {
					type: 'line',
					data: {
						labels: labels,
						datasets: [
							{
								label: 'Temperatuere',
								data: temperatureData,
								backgroundColor: '#ba4a00',
								borderColor: '#ba4a00',
							},
						],
					},

					options: {
						responsive: true,
						maintainAspectRatio: false,
						scales: {
							x: {
								grid: {
									color: '#3f3f3f',
								},
								position: 'bottom',
								type: 'time',
								time: {
									tooltipFormat: 'yyyy-MM-dd HH:mm:ss', // Display local time in tooltip
									displayFormats: {
										hour: 'HH:mm',
										minute: 'HH:mm',
										second: 'HH:mm:ss',
									},
								},
								min: minTime,
								max: maxTime,
								bounds: 'ticks', // Ensures it only shows actual ticks

								ticks: {
									autoSkip: false,
									maxTicksLimit: 10,
									autoSkipPadding: 50,
									maxRotation: 0,
									callback: (value) => {
										return new Date(value).toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
											second: '2-digit',
										}); // Convert timestamps to local time
									},
								},
							},
							y: {
								grid: {
									color: '#3f3f3f',
								},
								// ticks: {
								// 	maxTicksLimit: 3,
								// },
							},
						},
						plugins: {
							zoom: {
								zoom: {
									wheel: {
										enabled: true,
									},
									pinch: {
										enabled: true,
									},
									mode: 'x',
									drag: {
										enabled: true,
									},
								},
							},
						},
					},
				});

				if (
					chart.options.color &&
					chart.options.scales &&
					chart.options.scales.x &&
					chart.options.scales.x.ticks &&
					chart.options.scales.x.ticks.color &&
					chart.options.scales.y &&
					chart.options.scales.y.ticks &&
					chart.options.scales.y.ticks.color
				) {
					chart.options.color = '#000000';
					chart.options.scales.x.ticks.color = '#000000';
					chart.options.scales.y.ticks.color = '#000000';
					chart.update();
				}
			}

			const behaviorChart = document.getElementById('behavior-chart') as HTMLCanvasElement;
			if (behaviorChart) {
				const chart = new Chart(behaviorChart, {
					type: 'line',
					data: {
						labels: labels,
						datasets: [
							{
								label: 'Behavior State',
								data: behaviorData,
								backgroundColor: '#3498db',
								borderColor: '#3498db',
								stepped: true,
							},
						],
					},

					options: {
						responsive: true,
						maintainAspectRatio: false,
						scales: {
							x: {
								grid: {
									color: '#3f3f3f',
								},
								position: 'bottom',
								type: 'time',
								time: {
									tooltipFormat: 'yyyy-MM-dd HH:mm:ss', // Display local time in tooltip
									displayFormats: {
										hour: 'HH:mm',
										minute: 'HH:mm',
										second: 'HH:mm:ss',
									},
								},
								min: minTime,
								max: maxTime,
								bounds: 'ticks', // Ensures it only shows actual ticks

								ticks: {
									autoSkip: false,
									maxTicksLimit: 10,
									autoSkipPadding: 50,
									maxRotation: 0,
									callback: (value) => {
										return new Date(value).toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
											second: '2-digit',
										}); // Convert timestamps to local time
									},
								},
							},
							y: {
								grid: {
									color: '#3f3f3f',
								},
								ticks: {
									maxTicksLimit: 3,
								},
							},
						},
						plugins: {
							zoom: {
								zoom: {
									wheel: {
										enabled: true,
									},
									pinch: {
										enabled: true,
									},
									mode: 'x',
									drag: {
										enabled: true,
									},
								},
							},
						},
					},
				});

				if (
					chart.options.color &&
					chart.options.scales &&
					chart.options.scales.x &&
					chart.options.scales.x.ticks &&
					chart.options.scales.x.ticks.color &&
					chart.options.scales.y &&
					chart.options.scales.y.ticks &&
					chart.options.scales.y.ticks.color
				) {
					chart.options.color = '#000000';
					chart.options.scales.x.ticks.color = '#000000';
					chart.options.scales.y.ticks.color = '#000000';
					chart.update();
				}
			}
		}
	}, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleCattleFetch = async () => {
		setLoading(true);
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cattle/cattle-statistics/${cattleId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		if (response.ok) {
			setMinutesInIntenseLight(data.totalMinsInIntenseLight);
			setMinutesInModerateLight(data.totalMinsInModerateLight);
			setMinutesInLowLight(data.totalMinsInLowLight);

			setLowestTemperature(data.minTemp);
			setGreatestTemperature(data.maxTemp);
			setAverageTemperature(Math.round(data.avgTemp * 100) / 100);

			setMinutesGrazing(data.totalMinsInGrazing);
			setMinutesResting(data.totalMinsInRest);
			setMinutesOther(data.totalMinsInOther);

			const mapTimeLabels = data.dayInfo.map((item: any) => {
				return new Date(item.date).toISOString();
			});

			const mapLightData = data.dayInfo.map((item: any) => {
				return item.lightLevel;
			});

			const mapTemperatureData = data.dayInfo.map((item: any) => {
				return item.temperature;
			});

			const mapMapData = data.dayInfo.map((item: any) => {
				if (item.latitude != 0 && item.longitude != 0) {
					setInitialPosition([item.latitude, item.longitude]);
				}

				return {
					lat: item.latitude,
					lng: item.longitude,
					behaviorState: item.behaviorState,
				};
			});

			setMapData(mapMapData);

			const mapBehaviorData = data.dayInfo.map((item: any) => {
				if (item.behaviorState === 'resting') {
					return 0;
				} else if (item.behaviorState === 'grazing') {
					return 1;
				} else {
					return 2;
				}
			});

			const timestamps = data.dayInfo.map((d: any) => new Date(d.date).getTime()); // Convert to ms
			setMinTime(Math.min(...timestamps));
			setMaxTime(Math.max(...timestamps));

			setLabels(mapTimeLabels);
			setLightData(mapLightData);
			setTemperatureData(mapTemperatureData);
			setBehaviorData(mapBehaviorData);
			setName(data.name);
			setUsername(data.username);
		} else {
			setError('Error fetching cattle');
		}
		setLoading(false);
	};

	// Function to get color based on state
	const getColor = (state: string) => {
		switch (state) {
			case 'grazing':
				return 'green';
			case 'resting':
				return 'blue';
			default:
				return 'orange';
		}
	};

	const LeafletMap = () => {
		return (
			<MapContainer
				center={initialPosition}
				zoom={20}
				style={{ height: '100%', width: '100%' }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>

				<LayerGroup>
					{mapData.map((item: any) => (
						<CircleMarker
							key={nanoid()}
							center={[item.lat, item.lng]}
							radius={1}
							pathOptions={{
								color: getColor(item.behaviorState),
								fillColor: getColor(item.behaviorState),
								fillOpacity: 0.2,
							}}
						>
							<Popup>
								<strong>State:</strong> {item.behaviorState}
							</Popup>
						</CircleMarker>
					))}
				</LayerGroup>
			</MapContainer>
		);
	};

	useEffect(() => {
		handleCattleFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='min-h-screen drawer bg-background-base lg:drawer-open'>
			<input
				id='dashboard-drawer'
				type='checkbox'
				className='drawer-toggle'
			/>
			<main className=' drawer-content'>
				<div className='grid grid-cols-12 grid-rows-[min-content] gap-y-12 p-4 lg:gap-x-12 lg:p-10 overflow-y-auto max-h-screen'>
					<DashboardHeader
						name={`Cow Name: ${name}`}
						avatarName={username}
					/>
					{loading || error ? (
						<div className='grid w-full col-span-12 items-center justify-items-center h-[70vh]'>
							{error ? (
								<span className='text-2xl font-semibold text-center text-red-500'>{error}</span>
							) : (
								<span className='loading loading-spinner loading-lg text-text-base'></span>
							)}
						</div>
					) : (
						<>
							<section className='w-full col-span-12 shadow-sm stats stats-vertical xl:stats-horizontal'>
								<div className='stat bg-base-300'>
									<div className='stat-title text-text-base'>Minutes In Intense Light</div>
									<div className='stat-value text-text-base'>{minutesInIntenseLight}</div>
								</div>
								<div className='stat bg-base-300'>
									<div className='stat-title text-text-base'>Minutes In Moderate Light</div>
									<div className='stat-value text-text-base'>{minutesInModerateLight}</div>
								</div>
								<div className='stat bg-base-300'>
									<div className='stat-title text-text-base'>Minutes In Low Light</div>
									<div className='stat-value text-text-base'>{minutesInLowLight}</div>
								</div>
								<div className='stat bg-base-300'>
									<div className='flex flex-col stat-title text-text-base test-sm'>
										<p>0 = Low Light</p>
										<p>1 = Moderate Light</p>
										<p>2 = Intense Light</p>
									</div>
								</div>
							</section>
							<section className='col-span-12 shadow-sm card bg-base-200'>
								<canvas
									id='light-chart'
									className='p-4 text-text-base max-h-[42rem]'
								></canvas>
							</section>
							<section className='w-full col-span-12 shadow-sm stats stats-vertical xl:stats-horizontal'>
								<div className='stat bg-base-300'>
									<div className='stat-title text-text-base'>Lowest Surrounding Temperature</div>
									<div className='stat-value text-text-base'>{lowestTemperature}</div>
								</div>
								<div className='stat bg-base-300'>
									<div className='stat-title text-text-base'>Greatest Surrounding Temperature</div>
									<div className='stat-value text-text-base'>{greatestTemperature}</div>
								</div>
								<div className='stat bg-base-300'>
									<div className='stat-title text-text-base'>Average Surrounding Temperature</div>
									<div className='stat-value text-text-base'>{averageTemperature}</div>
								</div>
							</section>
							<section className='col-span-12 shadow-sm card bg-base-200'>
								<canvas
									id='temperature-chart'
									className='p-4 text-text-base max-h-[42rem]'
								></canvas>
							</section>
							<section className='w-full col-span-12 shadow-sm stats stats-vertical xl:stats-horizontal'>
								<div className='stat bg-base-300'>
									<div className='stat-title text-text-base'>Minutes Grazing</div>
									<div className='stat-value text-text-base'>{minutesGrazing}</div>
								</div>
								<div className='stat bg-base-300'>
									<div className='stat-title text-text-base'>Minutes Resting</div>
									<div className='stat-value text-text-base'>{minutesResting}</div>
								</div>
								<div className='stat bg-base-300'>
									<div className='stat-title text-text-base'>Minutes Doing Other Activities</div>
									<div className='stat-value text-text-base'>{minutesOther}</div>
								</div>
								<div className='stat bg-base-300'>
									<div className='flex flex-col stat-title text-text-base test-sm'>
										<p>0 = Resting</p>
										<p>1 = Grazing</p>
										<p>2 = Other Activities</p>
									</div>
								</div>
							</section>
							<section className='col-span-12 shadow-sm card bg-base-200'>
								<canvas
									id='behavior-chart'
									className='p-4 text-text-base max-h-[42rem]'
								></canvas>
							</section>
							<section className='col-span-12 shadow-sm card bg-base-200'>
								<div
									id='map'
									className='p-4 text-text-base h-[600px]'
								>
									<LeafletMap />
								</div>
							</section>
							<section className='w-full col-span-12 shadow-sm bg-base-200 stats stats-vertical xl:stats-horizontal'>
								<div className='stat place-items-center'>
									<h2 className='p-4 text-3xl font-semibold text-center text-primary-base'>
										Update Cattle
									</h2>
								</div>
								<div className='flex flex-wrap items-center gap-4 stat place-items-center'>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Name</span>
										</label>
										<input
											id='cattle-name'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Gender</span>
										</label>
										<input
											id='cattle-gender'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Age</span>
										</label>
										<input
											id='cattle-age'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Description</span>
										</label>
										<input
											id='cattle-description'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Weight</span>
										</label>
										<input
											id='cattle-weight'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Breed</span>
										</label>
										<input
											id='cattle-breed'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
								</div>
								{/* {cattleLoading ? (
									<div className='p-4 stat place-items-center'>
										<button className='w-56 text-lg text-white bg-green-700 btn hover:bg-green-600'>
											<span className='loading'></span>
										</button>
									</div>
								) : (
									<div className='flex justify-center p-4 form-control stat'>
										<div className=''>
											<button
												//.onClick={handleAddCattle}
												className='w-56 text-lg text-white bg-green-700 btn hover:bg-green-600'
											>
												Submit
											</button>
										</div>
										<div className='label'>
											<span className='text-red-500 label-text-alt'>
												Disabled for the science fair!
											</span>
											{cattleError != '' ? (
												<span className='text-red-500 label-text-alt'>{cattleError}</span>
											) : (
												<span className='text-green-500 label-text-alt'>{cattleSuccess}</span>
											)}
										</div>
									</div>
								)} */}
								<div className='flex justify-center p-4 form-control stat'>
									<div className=''>
										<button
											//.onClick={handleAddCattle}
											className='w-56 text-lg text-white bg-green-700 btn hover:bg-green-600'
										>
											Submit
										</button>
									</div>
									<div className='label'>
										<span className='text-red-500 label-text-alt'>
											Disabled for the science fair!
										</span>
										{/* {cattleError != '' ? (
												<span className='text-red-500 label-text-alt'>{cattleError}</span>
											) : (
												<span className='text-green-500 label-text-alt'>{cattleSuccess}</span>
											)} */}
									</div>
								</div>
							</section>
						</>
					)}
				</div>
			</main>
			<aside className='z-10 drawer-side'>
				<label
					htmlFor='dashboard-drawer'
					className='drawer-overlay'
				></label>
				<nav
					data-theme='caramellatte'
					className='flex flex-col min-h-screen gap-2 px-6 py-10 overflow-y-auto text-white w-72 bg-secondary'
				>
					<div
						className='flex items-center gap-2 mx-4 mb-6 cursor-pointer'
						onClick={() => navigate('/dashboard')}
					>
						<GiCow size='3rem' />
						<div className='text-3xl font-semibold'>Moozer</div>
					</div>
					<ul className='menu'>
						<li className='my-1'>
							<a className='border-none btn bg-base-100'>
								<IoStatsChartOutline
									className=''
									size='1.5rem'
								/>
								24H Statistics
							</a>
						</li>
					</ul>
				</nav>
			</aside>
		</div>
	);
}
