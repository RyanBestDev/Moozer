import { FaTriangleExclamation } from 'react-icons/fa6';
import auth3 from '@/assets/images/auth/auth3.jpg';
import { GiCow } from 'react-icons/gi';

export const Recovery = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-base-200'>
			<div className='m-4 min-h-[50vh] w-full max-w-sm lg:max-w-4xl'>
				<div className='flex items-center justify-center gap-2 p-8'>
					<GiCow size='2rem' />
					<h1 className='text-lg font-bold'>Password recovery</h1>
				</div>
				<div className='grid bg-base-100 lg:aspect-[2/1] lg:grid-cols-2'>
					<figure className='object-cover pointer-events-none bg-base-300 max-lg:hidden'>
						<img
							src={auth3}
							alt='Recovery'
							className='object-cover h-full aspect-square'
						/>
					</figure>
					<form className='flex flex-col justify-center gap-4 px-10 py-10 lg:px-16'>
						<div className='text-xs text-white alert alert-error'>
							<FaTriangleExclamation />

							<span>This page is not in use</span>
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
								id='input1'
							/>
						</div>
						<button
							className='btn btn-neutral'
							type='submit'
						>
							Recover
						</button>
						<div className='justify-end label'>
							<a
								className='link-hover link label-text-alt'
								href='./login'
							>
								Login
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
