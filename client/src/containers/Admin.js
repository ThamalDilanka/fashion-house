import React, { useContext } from 'react';
import Session from '../util/Session';
import { AuthContext } from '../contexts/AuthContext';
import { store } from 'react-notifications-component';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import AddProduct from '../components/AddProduct/AddProduct';
import StoreManagersPanel from '../components/StoreManagersPanel/StoreManagersPanel'

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
			<div className='admin-panel-main-container d-flex bd-highlight'>
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
							<Link to='/admin'>
								<i className='fa fa-bar-chart'></i>Dashboard
							</Link>
						</li>
						<li>
							<Link to='/admin/store-managers'>
								<i className='fa fa-user'></i>Staff
							</Link>
						</li>
						<li>
							<Link to='/admin/categories'>
								<i className='fa fa-stream'></i>Categories
							</Link>
						</li>

						<li>
							<Link to='/admin/products'>
								<i className='fa fa-shopping-bag'></i>Products
							</Link>
						</li>
					</ul>
				</div>

				<section className='admin-panel-content-container'>
					<Switch>
						<Route path='/admin/products' component={AddProduct} />
						<Route
							path='/admin/store-managers'
							component={StoreManagersPanel}
						/>
					</Switch>
				</section>
			</div>
		</React.Fragment>
	);
};

export default Admin;
