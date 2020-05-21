import React, { useState, useContext, useEffect } from 'react';
import { store } from 'react-notifications-component';
import { Link, Redirect } from 'react-router-dom';
import Session from '../../util/Session';
import { storage } from '../../firebase/config';
import axios from 'axios';
import Collapsible from 'react-collapsible';

// Assets
import './StoreManagersPanel.css';

const StoreManagersPanel = (props) => {
	const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

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

		setIsRegistrationOpen(false);
	};

	return (
		<React.Fragment>
			<div className='container'>
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
					<form onSubmit={onRegistrationSubmit}>
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
							type='submit'
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
					</form>
				</Collapsible>

				<br />
				<table className='table table-striped'>
					<thead className='thead-dark'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>First</th>
							<th scope='col'>Last</th>
							<th scope='col'>Handle</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope='row'>1</th>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<th scope='row'>2</th>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<th scope='row'>3</th>
							<td>Larry</td>
							<td>the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</table>
			</div>
		</React.Fragment>
	);
};

export default StoreManagersPanel;
