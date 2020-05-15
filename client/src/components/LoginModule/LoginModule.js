import React from 'react';
import { Link } from 'react-router-dom';
import './LoginModule.css';
import loginImage from '../../images/login-side.jpg'

const LoginModule = (props) => {
	return (
		<div className='container signup-container card'>
			<div className='row'>
				<div className='signup-image-container col-md d-none d-sm-none d-md-block'>
					<img
            className='authImage'
            src={loginImage}
						alt='login-image'
					/>
				</div>
				<div className='signup-form-body col-md'>
					<br />
					<br />
					<h2>Login</h2>
					<hr />
					<form>
						<div className='form-group'>
							<label>Email</label>
							<input
								type='email'
								className='form-control'
								placeholder='Email Address'
							/>
						</div>
						<div className='form-group'>
							<label>Password</label>
							<input
								type='password'
								className='form-control'
								placeholder='Password'
							/>
						</div>
						<div className='form-group'>
              <Link to="/authenticator/signup">I don't have an account</Link>
						</div>
						<button
							type='submit'
							className='btn btn-primary float-right'
						>
							Login
						</button>
						<br />
						<br />
						<br />
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginModule;
