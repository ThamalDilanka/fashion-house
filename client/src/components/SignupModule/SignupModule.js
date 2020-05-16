import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { store } from 'react-notifications-component';
import Session from '../../util/Session';
import axios from 'axios';

// Assets
import './SignupModule.css';
import loginImage from '../../images/signup-side.jpg';

// Contexts
import { AuthContext } from '../../contexts/AuthContext';

const SignupModule = (props) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const [error, setError] = useState(undefined);

	const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

	const onFirstNameChange = (e) => {
		setFirstName(e.target.value);
	};

	const onLastNameChange = (e) => {
		setLastName(e.target.value);
	};

	const onEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const onPasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const onPasswordConfirmChange = (e) => {
		setPasswordConfirm(e.target.value);
	};

	const register = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:8000/api/v1/users/signup', {
				name: `${firstName} ${lastName}`,
				email,
				password,
				passwordConfirm,
			})
			.then((res) => {
				// Save the token in the local storage
				localStorage.setItem('token', res.data.token);

				// Set the auth status global context
				setIsLoggedIn(true);

				// Show a notification
				store.addNotification({
					title: `Welcome ${Session.getName().split(' ')[0]}!`,
					message: 'Your Fashion House account successfully created',
					type: 'success',
					insert: 'top-right',
					container: 'top-right',
					animationIn: ['animated', 'fadeIn'],
					animationOut: ['animated', 'fadeOut'],
					dismiss: {
						duration: 5000,
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

				// Better error handling needed
				if (
					err.response.data.message.startsWith(
						'E11000 duplicate key error collection'
					)
				) {
					setError('Entered email has already registered');
				} else {
					setError(err.response.data.message);
				}
			});
	};

	return (
		<div className='container signup-container card'>
			<div className='row'>
				<div className='signup-image-container no-padding col-md d-none d-sm-none d-md-block'>
					<img className='authImage' src={loginImage} alt='image' />
				</div>
				<div className='signup-form-body col-md'>
					<h2>Signup</h2>
					<p className='login-error-message'>{error}</p>
					<hr className='no-margin-top' />
					<form onSubmit={register}>
						<div className='form-row'>
							<div className='form-group col-md-6'>
								<label>First Name</label>
								<input
									type='text'
									className='form-control'
									placeholder='First Name'
									value={firstName}
									onChange={onFirstNameChange}
									required
								/>
							</div>
							<div className='form-group col-md-6'>
								<label>Last Name</label>
								<input
									type='text'
									className='form-control'
									placeholder='Last Name'
									value={lastName}
									onChange={onLastNameChange}
									required
								/>
							</div>
						</div>
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
						<div className='form-row'>
							<div className='form-group col-md-6'>
								<label>Password</label>
								<input
									type='password'
									className='form-control'
									placeholder='Create new password'
									value={password}
									onChange={onPasswordChange}
									required
								/>
							</div>
							<div className='form-group col-md-6'>
								<label>Confirm Password</label>
								<input
									type='password'
									className='form-control'
									placeholder='Re-enter the password'
									value={passwordConfirm}
									onChange={onPasswordConfirmChange}
									required
								/>
							</div>
						</div>
						<div className='form-group'>
							<Link to='/authenticator/login'>
								Already have an account?
							</Link>
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
