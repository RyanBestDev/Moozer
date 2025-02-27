import auth1 from '@/assets/images/auth/auth1.jpg';
import { GiCow } from 'react-icons/gi';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useNavigate } from 'react-router';

export const SignUp = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	let navigate = useNavigate();

	const handleSignup = async () => {
		setLoading(true);
		const name = (document.getElementById('name') as HTMLInputElement).value;
		const email = (document.getElementById('email') as HTMLInputElement).value;
		const password = (document.getElementById('password') as HTMLInputElement).value;

		await authClient.signUp.email(
			{
				name: name,
				email: email,
				password: password,
			},
			{
				onError(ctx) {
					setLoading(false);
					setError(ctx.error.message);
				},
				onSuccess: () => {
					navigate('/dashboard');
				},
			}
		);
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-base-200'>
			<div className='m-4 min-h-[50vh] w-full max-w-sm lg:max-w-4xl'>
				<div className='flex items-center justify-center gap-2 p-8'>
					<GiCow size='2rem' />
					<h1 className='text-lg font-bold'>Signup new account</h1>
				</div>
				<main className='grid bg-base-100 lg:aspect-[2/1] lg:grid-cols-2'>
					<figure className='object-cover pointer-events-none bg-base-300 max-lg:hidden'>
						<img
							src={auth1}
							alt='Sign up'
							className='object-cover h-full aspect-square'
						/>
					</figure>
					<form className='flex flex-col justify-center gap-4 px-10 py-10 lg:px-16'>
						<div className='form-control'>
							<label
								className='label'
								htmlFor='input1'
							>
								<span className='label-text'>Name</span>
							</label>
							<input
								type='text'
								placeholder='name'
								className='input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success'
								pattern='^[a-zA-Z0-9_.-]*$'
								required
								id='name'
							/>
						</div>
						<div className='form-control'>
							<label
								className='label'
								htmlFor='input1'
							>
								<span className='label-text'>Email</span>
							</label>
							<input
								type='email'
								placeholder='email'
								className='input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success'
								required
								id='email'
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
								placeholder='password'
								className='input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success'
								required
								form='input2'
								id='password'
							/>
						</div>
						{loading ? (
							<button className='btn btn-neutral'>
								<span className='loading'></span>
							</button>
						) : (
							<div className='form-control'>
								<button
									onClick={handleSignup}
									className='btn btn-neutral'
								>
									Sign Up
								</button>
								<div className='label'>
									<span className='text-red-500 label-text-alt'>{error}</span>
								</div>
							</div>
						)}

						<div className='justify-end label'>
							<a
								className='link-hover link label-text-alt'
								href='./login'
							>
								Login to existing accout
							</a>
						</div>
					</form>
				</main>
			</div>
		</div>
	);
};
