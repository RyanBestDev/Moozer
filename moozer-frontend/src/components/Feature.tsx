import tempTracking from '@/assets/images/landing/tempTracking.jpg';
import waterResistant from '@/assets/images/landing/waterResistant.jpg';
import lowMaintenance from '@/assets/images/landing/lowMaintenance.jpg';
import lightExposure from '@/assets/images/landing/lightExposure.jpg';
import behaviorTracking from '@/assets/images/landing/behaviorTracking.jpg';
import gpsTracking from '@/assets/images/landing/gpsTracking.jpg';
import { FaRegLightbulb } from 'react-icons/fa';
import { FaTemperatureHigh } from 'react-icons/fa';
import { MdOutlineGrass } from 'react-icons/md';
import { TbGps } from 'react-icons/tb';
import { IoIosWater } from 'react-icons/io';
import { TbSunElectricity } from 'react-icons/tb';

import { BentoGrid, BentoGridItem } from './ui/bento-grid';

export const Feature = () => {
	const items = [
		{
			title: 'Light Exposure',
			description: 'Track how long your cattle have been exposed to intense light.',
			header: (
				<img
					src={lightExposure}
					className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl shadow-white object-cover shadow-md bg-cover'
				/>
			),
			className: 'md:col-span-2 bg-base-200',
			icon: <FaRegLightbulb className='w-4 h-4 text-neutral-500' />,
		},
		{
			title: 'Temperature Tracking',
			description: 'Monitor the temperature your cattle are exposed to.',
			header: (
				<img
					src={tempTracking}
					className='flex flex-1 w-full h-full min-h-[6rem] object-cover rounded-xl shadow-white shadow-md'
				/>
			),
			className: 'md:col-span-1 bg-base-200',
			icon: <FaTemperatureHigh className='w-4 h-4 text-neutral-500' />,
		},
		{
			title: 'Behavior Tracking',
			description: 'Track how long your cattle have been grazing, resting, or doing other activities.',
			header: (
				<img
					src={behaviorTracking}
					className='flex flex-1 w-full h-full min-h-[6rem] object-cover rounded-xl shadow-white shadow-md'
				/>
			),
			className: 'md:col-span-1 bg-base-200',
			icon: <MdOutlineGrass className='w-4 h-4 text-neutral-500' />,
		},
		{
			title: 'GPS Tracking',
			description: 'Track where your cattle have been and what they have been doing at that location.',
			header: (
				<img
					src={gpsTracking}
					className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl shadow-white object-cover shadow-md bg-cover'
				/>
			),
			className: 'md:col-span-2 bg-base-200',
			icon: <TbGps className='w-4 h-4 text-neutral-500' />,
		},
		{
			title: 'Low Maintenance',
			description:
				'3 solar panels on the collar provide enough power to last indefinitely without charging, under normal conditions.',
			header: (
				<img
					src={lowMaintenance}
					className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl shadow-white object-cover shadow-md bg-cover'
				/>
			),
			className: 'md:col-span-2 bg-base-200',
			icon: <TbSunElectricity className='w-4 h-4 text-neutral-500' />,
		},
		{
			title: 'Water Resistant',
			description: 'Made to withstand the elements, created with durable carbon infused plastic.',
			header: (
				<img
					src={waterResistant}
					className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl shadow-white object-cover shadow-md bg-cover'
				/>
			),
			className: 'md:col-span-1 bg-base-200',
			icon: <IoIosWater className='w-4 h-4 text-neutral-500' />,
		},
	];

	return (
		<section
			className='py-8 lg:py-24'
			id='features'
		>
			<div
				className='container '
				id='features'
			>
				<div className='flex flex-col justify-end gap-24 lg:flex-row'>
					<div className='flex-1'>
						<p className='text-xl font-semibold lg:text-3xl'>
							An Abundant Amount Of Features To Track Cattle Health.
						</p>
						<p className='mt-4 text-base'>
							Moozer doesn't just track cattle health with AI, there are many other features to help
							determine the health of your cattle. From tracking the temperature of the cattle's
							surroundings all the way to tracking where your cattle have been, Moozer provides many
							features to help determine your cattle's health.
						</p>
					</div>
					<div className='flex-2'>
						<div className='space-y-3'>
							<BentoGrid className='max-w-4xl mx-auto md:auto-rows-[20rem]'>
								{items.map((item, i) => (
									<BentoGridItem
										key={i}
										title={item.title}
										description={item.description}
										header={item.header}
										className={item.className}
										icon={item.icon}
									/>
								))}
							</BentoGrid>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
