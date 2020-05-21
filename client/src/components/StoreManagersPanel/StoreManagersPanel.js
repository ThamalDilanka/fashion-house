import React, { useState, useContext, useEffect } from 'react';
import { store } from 'react-notifications-component';
import { Link, Redirect } from 'react-router-dom';
import Session from '../../util/Session';
import { storage } from '../../firebase/config';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import randomString from 'randomstring';
import StoreManagerItems from '../StoreManagers/StoreManagerItems';

// Assets
import './StoreManagersPanel.css';

const StoreManagersPanel = (props) => {
	const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const [storeManagers, setStoreManagers] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8000/api/v1/users?role=store-manager', {
				headers: {
					Authorization: `Bearer ${Session.getToken()}`,
				},
			})
			.then((res) => {
				setStoreManagers([...res.data.data.users]);
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, []);

	const onFirstNameChange = (e) => {
		setFirstName(e.target.value);
	};

	const onLastNameChange = (e) => {
		setLastName(e.target.value);
	};

	const onEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const onRegistrationSubmit = (e) => {
		e.preventDefault();
		const randomPassword = randomString.generate(10);
		const newStoreManager = {
			name: `${firstName} ${lastName}`,
			email: email,
			password: randomPassword,
			passwordConfirm: randomPassword,
			role: 'store-manager',
			isTemporary: true,
		};

		axios
			.post(
				'http://localhost:8000/api/v1/users/signup',
				newStoreManager,
				{
					headers: {
						Authorization: `Bearer ${Session.getToken()}`,
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				// Show a notification
				store.addNotification({
					title: `${res.data.data.user.name} successfully registered as a Store Manager`,
					message: 'Email has been sent with login credentials',
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
			})
			.catch((err) => {
				console.log(err.response);
			});

		setIsRegistrationOpen(false);
	};

	return (
		<React.Fragment>
			<div className='backend container'>
				<div className='d-flex bd-highlight'>
					<div className='flex-fill bd-highlight'>
						<h3 className='no-margin'>Store Managers</h3>
					</div>
					<div className='flex-fill bd-highlight'>
						<button
							className='add-new-btn float-right'
							onClick={() => {
								setIsRegistrationOpen(true);
							}}
						>
							<i className='fa fa-plus'></i> Add New
						</button>
					</div>
				</div>
				<hr />
				<Collapsible open={isRegistrationOpen}>
					<div>
						<div className='form-row'>
							<div className='col-md-6 mb-3'>
								<label>First name</label>
								<input
									type='text'
									className='form-control'
									placeholder='First Name'
									onChange={onFirstNameChange}
								/>
								<div className='invalid-feedback'>
									Looks good!
								</div>
							</div>
							<div className='col-md-6 mb-3'>
								<label>Last name</label>
								<input
									type='text'
									className='form-control '
									placeholder='Last Name'
									onChange={onLastNameChange}
								/>
								<div className='invalid-feedback'>
									Looks good!
								</div>
							</div>
						</div>
						<div className='form-row'>
							<div className='col-md-12 mb-3'>
								<label>Email Address</label>
								<input
									type='text'
									className='form-control'
									placeholder='Email Address'
									onChange={onEmailChange}
								/>
								<div className='invalid-feedback'>
									Looks good!
								</div>
							</div>
						</div>
						<p className='font-small'>
							Once you register a new store manager, he will
							notify via an email with the login credentials.
						</p>

						<button
							className='btn btn-primary float-right'
							onClick={onRegistrationSubmit}
						>
							Register
						</button>
						<button
							className='sm-cancel-btn btn btn-secondary float-right'
							onClick={() => {
								setIsRegistrationOpen(false);
							}}
						>
							Cancel
						</button>
					</div>
				</Collapsible>

				<br />
				<h5>Registered Store Manages</h5>
				<StoreManagerItems storeManagers={storeManagers}></StoreManagerItems>
			</div>
		</React.Fragment>
	);
};

export default StoreManagersPanel;
