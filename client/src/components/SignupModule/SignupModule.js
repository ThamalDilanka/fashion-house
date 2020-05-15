import React from 'react';
import { Link } from 'react-router-dom';
import './SignupModule.css';
import loginImage from '../../images/signup-side.jpg'

const SignupModule = (props) => {
	return (
		<div className='container signup-container card'>
			<div className='row'>
				<div className='signup-image-container no-padding col-md d-none d-sm-none d-md-block'>
					<img
						className='authImage'
						src={loginImage}
						alt=''
					/>
				</div>
				<div className='signup-form-body col-md'>
					<h2>Signup</h2>
					<hr />
					<form>
						<div className='form-row'>
							<div className='form-group col-md-6'>
								<label>First Name</label>
								<input
									type='text'
									className='form-control'
									placeholder='First Name'
								/>
							</div>
							<div className='form-group col-md-6'>
								<label>Last Name</label>
								<input
									type='text'
									className='form-control'
									placeholder='Last Name'
								/>
							</div>
						</div>
						<div className='form-group'>
							<label>Email</label>
							<input
								type='email'
								className='form-control'
								placeholder='Email Address'
							/>
						</div>
						<div className='form-row'>
							<div className='form-group col-md-6'>
								<label>Password</label>
								<input
									type='password'
									className='form-control'
									placeholder='Create new password'
								/>
							</div>
							<div className='form-group col-md-6'>
								<label>Confirm Password</label>
								<input
									type='password'
									className='form-control'
									placeholder='Re-enter the password'
								/>
							</div>
						</div>
						<div className='form-group'>
							<Link to="/authenticator/login">Already have an account?</Link>
						</div>
						<button
							type='submit'
							className='btn btn-primary float-right'
						>
							Register Me
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignupModule;
