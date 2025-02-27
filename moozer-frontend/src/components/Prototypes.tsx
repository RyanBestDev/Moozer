import { Timeline } from './ui/timeline';
import v11 from '@/assets/images/landing/v1.1.jpg';
import v12 from '@/assets/images/landing/v1.2.jpg';
import v13 from '@/assets/images/landing/v1.3.jpg';
import v14 from '@/assets/images/landing/v1.4.jpg';
import v21 from '@/assets/images/landing/v2.1.jpg';
import v22 from '@/assets/images/landing/v2.2.jpg';
import v23 from '@/assets/images/landing/v2.3.jpg';
import v24 from '@/assets/images/landing/v2.4.jpg';
import v31 from '@/assets/images/landing/v3.1.jpg';
import v32 from '@/assets/images/landing/v3.2.jpg';
import v33 from '@/assets/images/landing/v3.3.jpg';
import v34 from '@/assets/images/landing/v3.4.jpg';
import v41 from '@/assets/images/landing/v4.1.jpg';
import v42 from '@/assets/images/landing/v4.2.jpg';
import v43 from '@/assets/images/landing/v4.3.jpg';
import v44 from '@/assets/images/landing/v4.4.jpg';

export const Prototypes = () => {
	const data = [
		{
			title: 'Moozer v0.1',
			content: (
				<div>
					<p className='mb-8 font-normal text-neutralmd:text-sm'>
						The first version of the Moozer Collar. This version was a proof of concept that I built to test
						the feasibility of the idea. It was a simple collar that had 4 modules and one main larger
						module for all the components.
					</p>
					<div className='grid grid-cols-2 gap-4'>
						<img
							src={v11}
							className='object-cover h-20 rounded-lg justify-self-end md:h-44 lg:h-60'
						/>
						<img
							src={v12}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-start'
						/>
						<img
							src={v13}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-end'
						/>
						<img
							src={v14}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-start'
						/>
					</div>
				</div>
			),
		},
		{
			title: 'Moozer v0.2',
			content: (
				<div>
					<p className='mb-8 font-normal text-neutralmd:text-sm'>
						The second version of the Moozer Collar. made the size and main modules drastically smaller to
						fit on the cattle. I also made the TPU extensions thinner and bigger to improve flexibility.
						Designed it so different components would fit in each of the 5 modules.
					</p>
					<div className='grid grid-cols-2 gap-4'>
						<img
							src={v21}
							className='object-cover h-20 rounded-lg justify-self-end md:h-44 lg:h-60'
						/>
						<img
							src={v22}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-start'
						/>
						<img
							src={v23}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-end'
						/>
						<img
							src={v24}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-start'
						/>
					</div>
				</div>
			),
		},
		{
			title: 'Moozer v0.3',
			content: (
				<div>
					<p className='mb-8 font-normal text-neutralmd:text-sm'>
						The third version of the moozer Collar. This version was a major improvement over the previous
						one, eliminating one of the modules to make the collar smaller. I also added larger fillets on
						the edges of each module to make it more comfortable for the cattle. During testing, I extended
						the middle TPU extension to make the collar fit on both sides of the cattle.
					</p>
					<div className='grid grid-cols-2 gap-4'>
						<img
							src={v31}
							className='object-cover h-20 rounded-lg justify-self-end md:h-44 lg:h-60'
						/>
						<img
							src={v32}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-start'
						/>
						<img
							src={v33}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-end'
						/>
						<img
							src={v34}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-start'
						/>
					</div>
				</div>
			),
		},
		{
			title: 'Moozer v0.4',
			content: (
				<div>
					<p className='mb-8 font-normal text-neutralmd:text-sm'>
						The fourth, and final version of the Moozer Collar brings subtle improvements over the previous
						one. The components in the module were shifted to better fit inside, I added an outside attacher
						for the collar, and extended the middle TPU extension to seemlessly fit on the cow.
					</p>
					<div className='grid grid-cols-2 gap-4'>
						<img
							src={v41}
							className='object-cover h-20 rounded-lg justify-self-end md:h-44 lg:h-60'
						/>
						<img
							src={v42}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-start'
						/>
						<img
							src={v43}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-end'
						/>
						<img
							src={v44}
							className='object-cover h-20 rounded-lg md:h-44 lg:h-60 justify-self-start'
						/>
					</div>
				</div>
			),
		},
	];

	return (
		<section
			className=''
			id='prototypes'
		>
			<div className='container'>
				<Timeline data={data} />
			</div>
		</section>
	);
};
