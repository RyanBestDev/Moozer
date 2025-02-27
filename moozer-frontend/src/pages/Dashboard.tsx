// import React from 'react';
import { useEffect, useState } from 'react';
import { PiCow } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/DashboardHeader';
import Cookies from 'js-cookie';
import { GiCow } from 'react-icons/gi';

export default function Dashboard() {
	const navigate = useNavigate();
	const [cattle, setCattle] = useState([]);
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);
	const [cattleLoading, setCattleLoading] = useState(false);
	const [cattleError, setCattleError] = useState('');
	const [cattleSuccess, setCattleSuccess] = useState('');

	const handleCattleFetch = async () => {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cattle/get`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		if (response.ok) {
			setCattle(data.cattle);
			setName(data.username);
		} else {
			setError('Error fetching cattle');
		}
		setLoading(false);
	};

	const handleAddCattle = async () => {
		setCattleLoading(true);
		const name = (document.getElementById('cattle-name') as HTMLInputElement).value;
		const gender = (document.getElementById('cattle-gender') as HTMLInputElement).value;
		const age = (document.getElementById('cattle-age') as HTMLInputElement).value;
		const description = (document.getElementById('cattle-description') as HTMLInputElement).value;
		const weight = (document.getElementById('cattle-weight') as HTMLInputElement).value;
		const breed = (document.getElementById('cattle-breed') as HTMLInputElement).value;

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cattle/create-cattle`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				name,
				gender,
				age: Number(age),
				description,
				weight: Number(weight),
				breed,
			}),
		});

		if (response.ok) {
			setCattleSuccess('Cattle added successfully');
			setCattleLoading(false);
			setCattleError('');
		} else {
			setCattleError('Error adding cattle');
			setCattleLoading(false);
			setCattleSuccess('');
		}
	};

	useEffect(() => {
		if (!Cookies.get('better-auth.session_token')) {
			navigate('/');
		}

		handleCattleFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='min-h-screen drawer bg-background-base lg:drawer-open'>
			<input
				id='dashboard-drawer'
				type='checkbox'
				className='drawer-toggle'
			/>
			<main className='drawer-content'>
				<div className='grid grid-cols-12 grid-rows-[min-content] gap-y-12 p-4 lg:gap-x-12 lg:p-10'>
					<DashboardHeader
						name='Servers'
						avatarName={name}
					/>
					{loading || error ? (
						<div className='grid w-full col-span-12 items-center justify-items-center h-[70vh]'>
							{error ? (
								<span className='text-2xl font-semibold text-center text-red-500'>{error}</span>
							) : (
								<span className='loading loading-spinner loading-lg text-text-base'></span>
							)}
						</div>
					) : (
						<>
							{cattle.map((cow: any) => {
								return (
									<section
										key={cow.id}
										className='w-full col-span-12 shadow-sm stats stats-vertical xl:stats-horizontal bg-base-200'
									>
										{/* <div className='flex flex-row gap-2 justify-items-center stat place-items-center'>
											<img
												className='rounded w-[5rem]'
												src={xss(group.groupPicture)}
											/>
											<div className='mx-auto text-2xl font-semibold text-text-base'>
												{group.name}
											</div>
										</div> */}
										<div className='stat place-items-center'>
											<div className='stat-title'>Cattle Name</div>
											<div className='text-xl font-semibold stat-value text-text-base'>
												{cow.name}
											</div>
											<div className='stat-desc text-text-base'>Age: {cow.age}</div>
										</div>
										<div className='stat place-items-center'>
											<div className='stat-title'>Breed</div>
											<div className='mx-auto text-xl font-semibold stat-value text-text-base'>
												{cow.breed}
											</div>
											<div className='text-text-base stat-desc'>Weight: {cow.weight}</div>
										</div>
										<div className='stat place-items-center'>
											<div className='text-green-700 stat-title'>Online</div>
											<div className='stat-actions'>
												<button
													className='text-white bg-green-700 btn btn-sm btn-success hover:bg-green-600'
													onClick={() => navigate(`/dashboard/${cow.id}`)}
												>
													Manage Cattle
												</button>
											</div>
										</div>
									</section>
								);
							})}
							<section className='w-full col-span-12 shadow-sm bg-base-200 stats stats-vertical xl:stats-horizontal'>
								<div className='stat place-items-center'>
									<h2 className='p-4 text-3xl font-semibold text-center text-primary-base'>
										Add New Cattle
									</h2>
								</div>
								<div className='flex flex-wrap items-center gap-4 stat place-items-center'>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Name</span>
										</label>
										<input
											id='cattle-name'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Gender</span>
										</label>
										<input
											id='cattle-gender'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Age</span>
										</label>
										<input
											id='cattle-age'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Description</span>
										</label>
										<input
											id='cattle-description'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Weight</span>
										</label>
										<input
											id='cattle-weight'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Cattle Breed</span>
										</label>
										<input
											id='cattle-breed'
											type='text'
											placeholder='Type here'
											className='w-full max-w-xs input input-bordered bg-base-100 border-secondary input-secondary'
										/>
									</div>
								</div>
								{cattleLoading ? (
									<div className='p-4 stat place-items-center'>
										<button className='w-56 text-lg text-white bg-green-700 btn hover:bg-green-600'>
											<span className='loading'></span>
										</button>
									</div>
								) : (
									<div className='flex justify-center p-4 form-control stat'>
										<div className=''>
											<button
												onClick={handleAddCattle}
												className='w-56 text-lg text-white bg-green-700 btn hover:bg-green-600'
											>
												Submit
											</button>
										</div>
										<div className='label'>
											{cattleError != '' ? (
												<span className='text-red-500 label-text-alt'>{cattleError}</span>
											) : (
												<span className='text-green-500 label-text-alt'>{cattleSuccess}</span>
											)}
										</div>
									</div>
								)}
							</section>
						</>
					)}
				</div>
			</main>
			<aside className='z-10 drawer-side'>
				<label
					htmlFor='dashboard-drawer'
					className='drawer-overlay'
				></label>
				<nav
					data-theme='caramellatte'
					className='flex flex-col min-h-screen gap-2 px-6 py-10 overflow-y-auto text-white w-72 bg-secondary'
				>
					<div className='flex items-center gap-2 mx-4 mb-6'>
						<GiCow size='3rem' />
						<div className='text-3xl font-semibold'>Moozer</div>
					</div>
					<ul className='menu'>
						<li className='my-1'>
							<a className='border-none btn bg-base-100'>
								<PiCow
									className=''
									size='1.5rem'
								/>
								Cattle
							</a>
						</li>
					</ul>
				</nav>
			</aside>
		</div>
	);
}
