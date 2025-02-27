import worldMapImg from '@/assets/images/landing/world-map.png';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from 'lucide-react';
import { Navigation, Autoplay, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import pic from '@/assets/images/landing/pic.png';
import pic1 from '@/assets/images/landing/pic1.png';
import pic2 from '@/assets/images/landing/pic2.png';
import 'swiper/css';

export const Testimonial = () => {
	return (
		<section
			id='testimonial'
			className='container relative py-8 lg:py-24'
		>
			<div
				className='absolute inset-0 bg-center bg-no-repeat bg-cover opacity-20 dark:opacity-50'
				style={{ backgroundImage: `url(${worldMapImg})` }}
			></div>
			<div className='relative z-10'>
				<div className='text-center'>
					<h2 className='text-4xl font-semibold'>What People Say</h2>
				</div>
				<Swiper
					className='mt-16'
					spaceBetween={50}
					loop
					autoplay={{
						delay: 5000,
					}}
					navigation={{
						prevEl: '.testimonials-button-prev',
						nextEl: '.testimonials-button-next',
					}}
					modules={[Navigation, Autoplay, Thumbs]}
					slidesPerView={1}
				>
					<SwiperSlide>
						<div className='text-center'>
							<div className='avatar'>
								<div className='w-16 mask mask-squircle bg-base-content/10'>
									<img src={pic} />
								</div>
							</div>
							<div className='flex items-center justify-center gap-1 mt-4'>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
							</div>
							<p className='mt-4 inline-block max-w-[600px] text-center'>I love the collar</p>
							<p className='mt-8 text-lg font-medium'>My Dad</p>
							<p className='text-sm text-base-content/70'>(Owner Of A Pasture)</p>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className='text-center'>
							<div className='avatar'>
								<div className='w-16 mask mask-squircle bg-base-content/10'>
									<img src={pic1} />
								</div>
							</div>
							<div className='flex items-center justify-center gap-1 mt-4'>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
							</div>
							<p className='mt-4 inline-block max-w-[600px] text-center'>
								This project was a great experience for me. I had so much fun developing a product and
								solving problems. I started programming when I was about 8 years old when I was first
								introduced to the game called Roblox. I learned how to program in lua and became
								addicted to designing games as my imagination flourished. Soon after, I moved to web
								development in order to expand my knowledge and creativity. And finally, my most recent
								stop was robotics as I was able to combine my love for hardware and software. I am so
								grateful for the opportunity to work on this project and I hope you enjoy it as much as
								I did.
							</p>
							<p className='mt-8 text-lg font-medium'>Ryan Sano</p>
							<p className='text-sm text-base-content/70'>(Designer Of The Collar)</p>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className='text-center'>
							<div className='avatar'>
								<div className='w-16 mask mask-squircle bg-base-content/10'>
									<img src={pic2} />
								</div>
							</div>
							<div className='flex items-center justify-center gap-1 mt-4'>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
								<StarIcon
									className='text-orange-400 fill-orange-400'
									size={20}
								/>
							</div>
							<p className='mt-4 inline-block max-w-[600px] text-center'>MOOOOOOOOZER</p>
							<p className='mt-8 text-lg font-medium'>Bibi</p>
							<p className='text-sm text-base-content/70'>(Cow)</p>
						</div>
					</SwiperSlide>
				</Swiper>
				<div className='relative flex items-center justify-center gap-6 mt-8'>
					<div className='cursor-pointer testimonials-button-prev'>
						<div className='flex items-center justify-center w-10 h-10 transition-all border rounded-lg border-default-300 bg-default-50/90 hover:bg-default-50 hover:bg-base-content/5'>
							<ChevronLeftIcon size={20} />
						</div>
					</div>
					<div className='cursor-pointer testimonials-button-next'>
						<div className='flex items-center justify-center w-10 h-10 transition-all border rounded-lg border-default-300 bg-default-50/90 hover:bg-default-50 hover:bg-base-content/5'>
							<ChevronRightIcon size={20} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
