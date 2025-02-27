import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Avatar from './ui/avatar';
import { authClient } from '@/lib/auth-client';

export default function DashboardHeader(props: { name: string; avatarName: string }) {
	const navigate = useNavigate();

	const handleLogOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate('/');
				},
			},
		});
	};

	return (
		<header className='flex items-center col-span-12 gap-2 lg:gap-4'>
			<label
				htmlFor='dashboard-drawer'
				className='btn btn-square btn-ghost drawer-button lg:hidden'
			>
				<FiMenu
					size='2rem'
					className=''
					color='var(--text)'
				/>
			</label>
			<div className='grow'>
				<h1 className='text-xl font-semibold lg:text-2xl text-text-base'>{props.name}</h1>
			</div>
			<div className='z-10 px-8 text-lg font-semibold'>
				<span>{props.avatarName}</span>
			</div>
			<div className='z-10 pr-12 dropdown-end dropdown'>
				<div
					tabIndex={0}
					className='avatar btn btn-circle btn-ghost'
				>
					<div className='w-10 rounded-full'>
						<Avatar name={props.avatarName} />
					</div>
				</div>
				<ul
					tabIndex={0}
					className='p-2 mt-3 shadow-2xl menu dropdown-content w-52 rounded-box bg-base-100'
				>
					<li>
						<a onClick={() => navigate('/dashboard')}>User Settings</a>
					</li>
					<li>
						<a onClick={handleLogOut}>Log Out</a>
					</li>
				</ul>
			</div>
		</header>
	);
}
