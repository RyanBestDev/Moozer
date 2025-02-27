import arduino from '@/assets/images/landing/arduino.png';
import { Button } from 'react-daisyui';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { GiMeshNetwork } from 'react-icons/gi';
import { PinContainer } from './ui/3d-pin';
import { CgWebsite } from 'react-icons/cg';

export const About = () => {
	return (
		<section
			className=''
			id='about'
		>
			<div className='container'>
				<div className='grid items-center gap-16 lg:grid-cols-2 xl:gap-24'>
					<div className='relative'>
						<div className='flex justify-center'>
							<div className='h-[40rem] w-full flex items-center justify-center '>
								<PinContainer
									title='arduino.cc/uno-r2-wifi'
									href='https://store.arduino.cc/products/uno-r4-wifi'
									className='bg-base-200'
								>
									<div className='flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] '>
										<h3 className='max-w-xs !pb-2 !m-0 font-bold text-neutral-600 text-2xl'>
											Arduino Uno R4 Wifi
										</h3>
										<div className='!m-0 !p-0 font-normal text-sm'>
											<span className='text-slate-500 '>
												Main microcontroller used for the Moozer Collar. Acts as the centralized
												unit to connect all the different sensors and components together.
											</span>
										</div>
										<img src={arduino}></img>
										{/* <div className='flex flex-1 w-full mt-4 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500' /> */}
									</div>
								</PinContainer>
							</div>
						</div>
					</div>

					<div className='col-span'>
						<p className='text-xl font-semibold lg:text-3xl'>How Does Moozer Work?</p>
						<p className='mt-3 text-base'>
							Moozer is an automated smart collar that tracks different health metrics of cattle. The
							collar tracks temperature, behavior, and movement in order to give farmers insights on if
							their cattle is showing early signs of illness.
						</p>
						<div className='grid grid-cols-2 gap-8 mt-8'>
							<div className='flex items-center gap-5'>
								<div className='inline-flex items-center justify-center p-2 font-medium rounded bg-primary/20 text-primary'>
									<GiArtificialIntelligence size={20} />
								</div>
								<p className='text-base'>AI-Powered Sensors Help Detect Abnormalities</p>
							</div>
							<div className='flex items-center gap-5'>
								<div className='inline-flex items-center justify-center p-2 font-medium rounded bg-primary/20 text-primary'>
									<MdOutlineHealthAndSafety size={20} />
								</div>
								<p className='text-base'>Detailed Dashboard Analysis For Insights On Health</p>
							</div>
							<div className='flex items-center gap-5'>
								<div className='inline-flex items-center justify-center p-2 font-medium rounded bg-primary/20 text-primary'>
									<FaCloudUploadAlt size={20} />
								</div>
								<p className='text-base'>Cloud Integration To Deliver Data Remotely</p>
							</div>
							<div className='flex items-center gap-5'>
								<div className='inline-flex items-center justify-center p-2 font-medium rounded bg-primary/20 text-primary'>
									<GiMeshNetwork size={20} />
								</div>
								<p className='text-base'>Neural Network Ran Straight On Microcontroller</p>
							</div>
						</div>
						<a
							href='https://pawsupal.com/cow-sleeping/'
							target='_blank'
						>
							<Button
								color={'ghost'}
								size={'sm'}
								className='mt-8'
							>
								Read More
								<CgWebsite size={16} />
							</Button>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};
