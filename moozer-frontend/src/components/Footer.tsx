import { GiCow } from 'react-icons/gi';

export const Footer = () => {
	return (
		<footer
			className='rounded-t-xl bg-neutral text-neutral-content'
			data-theme='dark'
		>
			<div className='container py-12'>
				<div className='flex flex-row items-center gap-2'>
					<GiCow size='3rem' />
					<p className='text-2xl font-bold'>Moozer</p>
				</div>
			</div>

			<div className='px-8 py-4 text-center border-t border-white/10 lg:px-40'>
				🌼 Made with{' '}
				<a
					className='link-hover link'
					href='https://daisyui.com'
					target='_blank'
				>
					daisyUI{' '}
				</a>
				and love from Ryan
			</div>
		</footer>
	);
};
