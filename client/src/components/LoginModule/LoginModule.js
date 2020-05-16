import React, { useState, useContext } from 'react';

import { store } from 'react-notifications-component';
import timeGreeting from 'time-greeting';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import Session from '../../util/Session';

// Assets
import './LoginModule.css';
import loginImage from '../../images/login-side.jpg';

// Contexts
import { AuthContext } from '../../contexts/AuthContext';

const LoginModule = (props) => {
	const [email, setEmail] = useState('thamaldilanke@email.com');
	const [password, setPassword] = useState('pass@123');
	const [error, setError] = useState(undefined);

	const [setIsLoggedIn] = useContext(AuthContext);

	const onEmailChange = (e) => {
		setEmail(e.target.value);
		setError(undefined);
	};

	const onPasswordChange = (e) => {
		setPassword(e.target.value);
		setError(undefined);
	};

	const login = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:8000/api/v1/users/login', {
				email,
				password,
			})
			.then((res) => {
				// Save the token in the local storage
				localStorage.setItem('token', res.data.data.token);

				// Set the auth status global context
				setIsLoggedIn(true);

				// Show a notification
				store.addNotification({
					title: `${timeGreeting()} ${
						Session.getName().split(' ')[0]
					}!`,
					message: 'You have successfully logged in',
					type: 'success',
					insert: 'top-right',
					container: 'top-right',
					animationIn: ['animated', 'fadeIn'],
					animationOut: ['animated', 'fadeOut'],
					dismiss: {
						duration: 3000,
						showIcon: true,
					},
				});

				// Redirecting to the home
				props.history.push('/');
			})
			.catch((err) => {
				// Remove the token from the local storage
				localStorage.removeItem('token');
				setIsLoggedIn(false);
				setError(err.response.data.message);
				setEmail('');
				setPassword('');
			});
	};

	return (
		<React.Fragment>
			{Session.isLoggedIn() ? <Redirect to='/' /> : null}

			<div className='container signup-container card'>
				<div className='row'>
					<div className='signup-image-container col-md d-none d-sm-none d-md-block'>
						<img
							className='authImage'
							src={loginImage}
							alt='login-pic'
						/>
					</div>
					<div className='signup-form-body col-md'>
						<br />
						<br />
						<h2>Login</h2>
						<p className='login-error-message'>{error}</p>
						<hr className='no-margin-top' />
						<form onSubmit={login}>
							<div className='form-group'>
								<label>Email</label>
								<input
									type='email'
									className='form-control'
									placeholder='Email Address'
									value={email}
									onChange={onEmailChange}
									required
								/>
							</div>
							<div className='form-group'>
								<label>Password</label>
								<input
									type='password'
									className='form-control'
									placeholder='Password'
									value={password}
									onChange={onPasswordChange}
									required
								/>
							</div>
							<div className='form-group'>
								<Link to='/authenticator/signup'>
									I don't have an account
								</Link>
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
		</React.Fragment>
	);
};

export default LoginModule;
