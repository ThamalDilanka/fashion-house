import React, { useContext } from 'react';
import Session from '../util/Session';
import { AuthContext } from '../contexts/AuthContext';
import { store } from 'react-notifications-component';
import { Link, Redirect } from 'react-router-dom';

const Admin = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

	const onLogoutClick = () => {
		setIsLoggedIn(false);
		localStorage.removeItem('token');

		// Show a notification
		store.addNotification({
			title: 'Good Bye!',
			message: 'You have logged out successfully. See you soon.',
			type: 'success',
			insert: 'top-right',
			container: 'top-right',
			animationIn: ['animated', 'fadeIn'],
			animationOut: ['animated', 'fadeOut'],
			dismiss: {
				duration: 2000,
				showIcon: true,
			},
		});
	};

	return (
		<React.Fragment>
			{Session.isLoggedIn() ? null : <Redirect to='/' />}
			<div className='admin-panel-main-container'>
				<div className='sidebar'>
					<header>
						<img
							src={Session.getImage()}
							alt='admin'
							className='side-bar-profile-image rounded-circle'
						/>
						<p className='no-margin sidebar-user-name'>
							{Session.getName()}
						</p>
						<p className='no-margin sidebar-user-email'>
							{Session.getEmail()}
						</p>
						<button
							className='side-nav-logout-btn'
							onClick={onLogoutClick}
						>
							<i className='fa fa-lock'></i> Logout
						</button>
					</header>
					<ul>
						<li>
							<a href='#'>
								<i className='fa fa-qrcode'></i>Dashboard
							</a>
						</li>
						<li>
							<a href='#'>
								<i className='fa fa-link'></i>Store Managers
							</a>
						</li>
						<li>
							<a href='#'>
								<i className='fa fa-stream'></i>Categories
							</a>
						</li>
					</ul>
				</div>

				<section className='admin-panel-content-container'></section>
			</div>
		</React.Fragment>
	);
};

export default Admin;
