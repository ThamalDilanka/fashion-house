import React, { useState, useEffect } from 'react';
import { store } from 'react-notifications-component';
import Session from '../../util/Session';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import randomString from 'randomstring';
import StoreManagerItems from '../StoreManagers/StoreManagerItems';
import validator from 'validator';

// Assets
import './StoreManagersPanel.css';

const StoreManagersPanel = (props) => {
	const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const [isFirstNameValid, setIsFirstNameValid] = useState(true);
	const [isLastNameValid, setIsLastNameValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);

	const [isModified, setIsModified] = useState(false);

	const [storeManagers, setStoreManagers] = useState([]);

	const [updated, setUpdated] = useState(0);

	const updateComponent = () => {
		setUpdated(updated + 1);
	};

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
	}, [updated]);

	const onFirstNameChange = (e) => {
		setFirstName(e.target.value);
		setIsModified(true);
	};

	const onLeaveFirstName = (e) => {
		setIsFirstNameValid(!validator.isEmpty(e.target.value));
	};

	const onLastNameChange = (e) => {
		setLastName(e.target.value);
		setIsModified(true);
	};

	const onLeaveLastName = (e) => {
		setIsLastNameValid(!validator.isEmpty(e.target.value));
	};

	const onEmailChange = (e) => {
		setEmail(e.target.value);
		setIsModified(true);
	};

	const onLeaveEmail = (e) => {
		setIsEmailValid(validator.isEmail(e.target.value));
	};

	const onRegistrationCancel = () => {
		setIsRegistrationOpen(false);
		setIsFirstNameValid(true);
		setIsLastNameValid(true);
		setIsEmailValid(true);
		setIsModified(false);
		setFirstName('');
		setLastName('');
		setEmail('');
	};

	const onRegistrationSubmit = (e) => {
		e.preventDefault();

		if (!(isFirstNameValid && isLastNameValid && isEmailValid)) {
			return;
		} else if (!isModified) {
			setIsFirstNameValid(false);
			setIsLastNameValid(false);
			setIsEmailValid(false);
			return;
		}

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
				updateComponent();

				// Show a notification
				store.addNotification({
					title: `Successfully registered`,
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
				return;
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
				{isRegistrationOpen ? <hr /> : null}
				<Collapsible open={isRegistrationOpen}>
					<div>
						<div className='form-row'>
							<div className='col-md-6 mb-3'>
								<label>First name</label>
								<input
									type='text'
									className={
										isFirstNameValid
											? 'form-control'
											: 'form-control is-invalid'
									}
									placeholder='First Name'
									onChange={onFirstNameChange}
									onBlur={onLeaveFirstName}
								/>
								<div className='invalid-feedback'>
									please enter the first name
								</div>
							</div>
							<div className='col-md-6 mb-3'>
								<label>Last name</label>
								<input
									type='text'
									className={
										isLastNameValid
											? 'form-control'
											: 'form-control is-invalid'
									}
									placeholder='Last Name'
									onChange={onLastNameChange}
									onBlur={onLeaveLastName}
								/>
								<div className='invalid-feedback'>
									please enter the last name
								</div>
							</div>
						</div>
						<div className='form-row'>
							<div className='col-md-12 mb-3'>
								<label>Email Address</label>
								<input
									type='text'
									className={
										isEmailValid
											? 'form-control'
											: 'form-control is-invalid'
									}
									placeholder='Email Address'
									onChange={onEmailChange}
									onBlur={onLeaveEmail}
								/>
								<div className='invalid-feedback'>
									please enter a valid email
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
							onClick={onRegistrationCancel}
						>
							Cancel
						</button>
					</div>
				</Collapsible>

				<br />
				{isRegistrationOpen ? <h5>Registered Store Manages</h5> : null}
				<StoreManagerItems
					storeManagers={storeManagers}
					updateComponent={updateComponent}
				></StoreManagerItems>
			</div>
		</React.Fragment>
	);
};

export default StoreManagersPanel;
