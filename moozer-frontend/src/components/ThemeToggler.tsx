import { Dropdown, Menu, useTheme } from 'react-daisyui';
import { Airplay, ChevronUpIcon, Moon, Sun } from 'lucide-react';

export const ThemeToggler = () => {
	const { setTheme } = useTheme();

	return (
		<div className='fixed z-10 flex flex-col items-center bottom-5 end-5'>
			<Dropdown className='dropdown-end dropdown-top'>
				<Dropdown.Toggle>
					Theme
					<ChevronUpIcon size={12} />
				</Dropdown.Toggle>
				<Dropdown.Menu className='w-52'>
					<Menu size={'xs'}>
						<Menu.Item onClick={() => setTheme('light')}>
							<div className='flex gap-3 text-sm'>
								<Airplay className='h-5' />
								Light
							</div>
						</Menu.Item>
						<Menu.Item onClick={() => setTheme('caramellatte')}>
							<div className='flex gap-3 text-sm'>
								<Sun className='h-5' />
								Caramel
							</div>
						</Menu.Item>
						<Menu.Item onClick={() => setTheme('dark')}>
							<div className='flex gap-3 text-sm'>
								<Moon className='h-5' />
								Dark
							</div>
						</Menu.Item>
					</Menu>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};
