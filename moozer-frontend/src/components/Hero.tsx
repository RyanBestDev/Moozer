import plasticityImg from '@/assets/images/landing/plasticity.png';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { RiMindMap } from 'react-icons/ri';
import { BsFillMotherboardFill } from 'react-icons/bs';
import { IoMdTimer } from 'react-icons/io';
import { GiNightSleep } from 'react-icons/gi';
import { Meteors } from './ui/meteors';
import { TypewriterEffect } from './ui/typewriter-effect';

export const Hero = () => {
	const words = [
		{
			text: 'Moozer:',
			className: 'text-green-700 py-1 text-4xl/tight sm:text-start lg:text-5xl/tight',
		},
		{
			text: 'An',
			className: 'text-neutral  py-1  text-3xl/tight sm:text-start lg:text-4xl/tight',
		},
		{
			text: 'AI-Powered',
			className: 'text-neutral  py-1 text-3xl/tight sm:text-start lg:text-4xl/tight',
		},
		{
			text: 'Smart',
			className: 'text-neutral  py-1 text-3xl/tight sm:text-start lg:text-4xl/tight',
		},
		{
			text: 'Collar',
			className: 'text-neutral py-1 text-3xl/tight sm:text-start lg:text-4xl/tight',
		},
		{
			text: 'That',
			className: 'text-neutral py-1 text-3xl/tight sm:text-start lg:text-4xl/tight',
		},
		{
			text: 'Revolutionizes',
			className: 'text-neutral py-1 text-3xl/tight sm:text-start lg:text-4xl/tight',
		},
		{
			text: 'Cattle',
			className: 'text-neutral py-1 text-3xl/tight sm:text-start lg:text-4xl/tight',
		},
		{
			text: 'Health.',
			className: 'text-neutral py-1 text-3xl/tight sm:text-start lg:text-4xl/tight',
		},
	];

	return (
		<section
			className='relative py-8 lg:py-24'
			id='home'
		>
			<div className='container relative z-10 pb-8'>
				<div className='grid items-center gap-12 mt-16 lg:grid-cols-2 xl:gap-36'>
					<div className='order-1'>
						<h1 className='font-bold leading-10 tracking-tight text-left text-3xl/tight sm:text-start lg:text-4xl/tight text-neutral'>
							<TypewriterEffect
								words={words}
								cursorClassName='bg-slate-950'
								className='text-center lg:text-left'
							/>
						</h1>
					</div>

					<div className='relative order-2'>
						<CardContainer className='inter-var'>
							<CardBody className='bg-base-200 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  '>
								<CardItem
									translateZ='50'
									className='text-xl font-bold text-neutral-600 dark:text-white'
								>
									Model Prototype of The Moozer Collar
								</CardItem>
								<CardItem
									as='p'
									translateZ='60'
									className='max-w-sm mt-2 text-sm text-neutral-500 dark:text-neutral-300'
								>
									Through trial and error, I have made four prototype versions of the Moozer Collar.
									The picture below is prototype 3 of the Moozer Collar, known as Moozer V0.3 .
								</CardItem>
								<CardItem
									translateZ='100'
									className='w-full mt-4'
								>
									<img
										src={plasticityImg}
										height='1000'
										width='1000'
										className='object-cover w-full h-60 rounded-xl group-hover/card:shadow-xl'
										alt='Moozer Collar Prototype'
									/>
								</CardItem>
							</CardBody>
						</CardContainer>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-20 mt-16 text-center md:grid-cols-4'>
					<div>
						<div className='inline-block p-3 transition-all rounded bg-primary/10 hover:bg-primary/25'>
							<GiNightSleep size='2rem' />
						</div>
						<p className='mt-3 text-4xl font-semibold'>91.43%</p>
						<p className='mt-1 text-base-content/80'>Accuracy</p>
					</div>
					<div>
						<div className='inline-block p-3 transition-all rounded bg-primary/10 hover:bg-primary/25'>
							<RiMindMap size='2rem' />
						</div>
						<p className='mt-3 text-4xl font-semibold'>3 States</p>
						<p className='mt-1 text-base-content/80'>Of Behavior Tested</p>
					</div>
					<div>
						<div className='inline-block p-3 transition-all rounded bg-primary/10 hover:bg-primary/25'>
							<BsFillMotherboardFill size='2rem' />
						</div>
						<p className='mt-3 text-4xl font-semibold'>4 Prototypes</p>
						<p className='mt-1 text-base-content/80'>Developed</p>
					</div>
					<div>
						<div className='inline-block p-3 transition-all rounded bg-primary/10 hover:bg-primary/25'>
							<IoMdTimer size='2rem' />
						</div>

						<p className='mt-3 text-4xl font-semibold'>5 Months</p>
						<p className='mt-1 text-base-content/80'>Development Time</p>
					</div>
				</div>
			</div>
			<Meteors
				number={50}
				className=''
			/>
		</section>
	);
};
