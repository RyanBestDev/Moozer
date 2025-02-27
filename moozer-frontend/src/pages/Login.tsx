import auth2 from '@/assets/images/auth/auth2.jpg';
import { GiCow } from 'react-icons/gi';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export const Login = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	let navigate = useNavigate();

	const handleLogin = async () => {
		setLoading(true);

		const email = (document.getElementById('email') as HTMLInputElement).value;
		const password = (document.getElementById('password') as HTMLInputElement).value;

		await authClient.signIn.email(
			{
				email: email,
				password: password,
			},
			{
				onError() {
					setLoading(false);
					setError('Invalid email or password');
				},
				onSuccess: () => {
					navigate('/dashboard');
				},
			}
		);
	};

	useEffect(() => {
		if (Cookies.get('better-auth.session_token')) {
			navigate('/dashboard');
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='flex items-center justify-center min-h-screen bg-base-200'>
			<div className='m-4 min-h-[50vh] w-full max-w-sm lg:max-w-4xl'>
				<div className='flex items-center justify-center gap-2 p-8'>
					<GiCow size='2rem' />
					<h1 className='text-lg font-bold'>Login to your account</h1>
				</div>
				<main className='grid bg-base-100 lg:aspect-[2/1] lg:grid-cols-2'>
					<figure className='object-cover pointer-events-none bg-base-300 max-lg:hidden'>
						<img
							src={auth2}
							alt='Login'
							className='object-cover h-full aspect-square'
						/>
					</figure>
					<form className='flex flex-col justify-center gap-4 px-10 py-10 lg:px-16'>
						<div className='form-control'>
							<label
								className='label'
								htmlFor='input1'
							>
								<span className='label-text'>Email</span>
							</label>
							<input
								type='email'
								id='email'
								placeholder='email'
								className='input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success'
								required
							/>
						</div>
						<div className='form-control'>
							<label
								className='label'
								htmlFor='input2'
							>
								<span className='label-text'>Password</span>
							</label>
							<input
								type='password'
								id='password'
								placeholder='password'
								className='input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success'
								required
								form='input2'
							/>
						</div>
						<div className='flex items-center justify-between gap-3'>
							<label className='flex gap-3 text-xs cursor-pointer'>
								<input
									name='remember-me'
									type='checkbox'
									className='toggle toggle-xs'
								/>
								Remember me
							</label>
							<div className='label'>
								<a
									className='link-hover link label-text-alt'
									href='./recovery'
								>
									Forgot password?
								</a>
							</div>
						</div>
						{loading ? (
							<button className='btn btn-neutral'>
								<span className='loading'></span>
							</button>
						) : (
							<div className='form-control'>
								<button
									onClick={handleLogin}
									className='btn btn-neutral'
								>
									Login
								</button>
								<div className='label'>
									<span className='text-red-500 label-text-alt'>{error}</span>
								</div>
							</div>
						)}

						<div className='justify-end label'>
							<a
								className='link-hover link label-text-alt'
								href='./signup'
							>
								Create new account
							</a>
						</div>
					</form>
				</main>
			</div>
		</div>
	);
};
