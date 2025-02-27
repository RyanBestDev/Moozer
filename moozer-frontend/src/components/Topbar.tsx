import { Button, Drawer, Menu, Navbar } from 'react-daisyui';
import { Menu as MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GiCow } from 'react-icons/gi';

export const Topbar = () => {
	const [drawerOpened, setDrawerOpened] = useState(false);
	const [atTop, setAtTop] = useState(true);

	useEffect(() => {
		const onWindowScroll = () => {
			setAtTop(window.pageYOffset < 30);
		};
		window.addEventListener('scroll', onWindowScroll);
		onWindowScroll();
	}, []);

	return (
		<>
			<div
				id='navbar-wrapper'
				className={`container fixed inset-x-0 top-0 z-[60] backdrop-blur-sm transition-all duration-500 ${
					!atTop
						? 'border top-0 xl:mt-4 mt-0 xl:rounded-full z-20 bg-base-100 lg:bg-opacity-95 border-base-content/10 '
						: 'border-base-content/10'
				}`}
			>
				<div className=''>
					<Navbar className='px-0'>
						<Navbar.Start className='gap-2'>
							<div className='flex-none lg:hidden'>
								<Drawer
									open={drawerOpened}
									onClickOverlay={() => setDrawerOpened(!drawerOpened)}
									side={
										<Menu className='min-h-full gap-2 p-4 w-80 bg-base-100 text-base-content'>
											<Menu.Item
												className='font-medium btgn-hover:bg-green-600'
												onClick={() => setDrawerOpened(false)}
											>
												<a
													href='#'
													className='text-3xl font-bold tracking-tighter text-green-700'
												>
													Moozer
												</a>
											</Menu.Item>
											<Menu.Item
												className='font-medium'
												onClick={() => setDrawerOpened(false)}
											>
												<a href='#about'>About</a>
											</Menu.Item>
											<Menu.Item
												className='font-medium'
												onClick={() => setDrawerOpened(false)}
											>
												<a href='#features'>Features</a>
											</Menu.Item>
											<Menu.Item
												className='font-medium'
												onClick={() => setDrawerOpened(false)}
											>
												<a href='#prototypes'>Prototypes</a>
											</Menu.Item>
											<Menu.Item
												className='font-medium'
												onClick={() => setDrawerOpened(false)}
											>
												<a href='#testimonial'>Testimonials</a>
											</Menu.Item>

											<span className='divider'></span>
											<a
												onClick={() => setDrawerOpened(false)}
												className='flex items-center justify-center'
												href='./login'
											>
												<span className='mx-auto text-white bg-green-700 btn btn-sm hover:bg-green-600'>
													Dashboard
												</span>
											</a>
										</Menu>
									}
								>
									<Button
										shape='square'
										color='ghost'
										onClick={() => setDrawerOpened(true)}
									>
										<MenuIcon className='inline-block text-xl' />
									</Button>
								</Drawer>
							</div>

							<a
								href='#'
								className='flex flex-row items-center gap-4 text-3xl font-bold tracking-tighter text-green-700'
							>
								<GiCow size='3rem' /> Moozer
							</a>
						</Navbar.Start>

						<Navbar.End className='hidden w-full lg:flex'>
							<Menu
								horizontal
								size='sm'
								className='items-center gap-2 px-1'
							>
								<Menu.Item className='font-medium'>
									<a href='#about'>About</a>
								</Menu.Item>
								<Menu.Item className='font-medium'>
									<a href='#features'>Features</a>
								</Menu.Item>
								<Menu.Item className='font-medium'>
									<a href='#prototypes'>Prototypes</a>
								</Menu.Item>
								<Menu.Item className='font-medium'>
									<a href='#testimonial'>Testimonials</a>
								</Menu.Item>
								<a href='./login'>
									<span className='mx-auto text-white bg-green-700 btn btn-sm hover:bg-green-600'>
										Dashboard
									</span>
								</a>
							</Menu>
						</Navbar.End>
					</Navbar>
				</div>
			</div>
		</>
	);
};
