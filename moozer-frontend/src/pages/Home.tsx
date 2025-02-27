import { Outlet } from 'react-router';
import { Hero } from '@/components/Hero.tsx';
import { Feature } from '@/components/Feature.tsx';
import { Prototypes } from '@/components/Prototypes';
import { Topbar } from '@/components/Topbar.tsx';
import { Footer } from '@/components/Footer.tsx';
import { About } from '@/components/About';
import { Testimonial } from '@/components/Testimonial.tsx';

export default function Home() {
	return (
		<>
			<Topbar />
			<Hero />
			<span className='divider'></span>
			<About />
			<span className='divider'></span>
			<Feature />
			<span className='divider'></span>
			<Prototypes />
			<span className='divider'></span>
			<Testimonial />
			<Footer />
			<Outlet />
		</>
	);
}
