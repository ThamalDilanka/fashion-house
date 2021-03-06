import React, { useContext } from 'react';
import Session from '../util/Session';
import { AuthContext } from '../contexts/AuthContext';
import { store } from 'react-notifications-component';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import AddProduct from '../components/AddProduct/AddProduct';
import StoreManagersPanel from '../components/StoreManagersPanel/StoreManagersPanel';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import NotFound from '../components/NotFound/NotFound';
import CategoryPanel from '../components/CategoriesPanel/CategoriesPanel';
import SMProductPanel from '../components/SMProductPanel/SMProductPanel';

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
			{Session.getRole() === 'customer' ? (
				<Redirect to='/not-found' />
			) : null}
			{Session.getRole() === 'store-manager' ? (
				<Redirect to='/store-manager' />
			) : null}
			{Session.getRole() === 'admin' ? <Redirect to='/admin' /> : null}

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
							<Link to='/admin/dashboard'>
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
						<Route
							path='/admin/products'
							exact
							component={SMProductPanel}
						/>
						<Route
							path='/admin/dashboard'
							exact
							component={AdminDashboard}
						/>
						<Route
							path='/admin/store-managers'
							exact
							component={StoreManagersPanel}
						/>
						<Route
							path='/admin/'
							exact
							component={AdminDashboard}
						/>
						<Route
							path='/admin/categories'
							exact
							component={CategoryPanel}
						/>

						<Redirect to='/not-found' />
					</Switch>
				</section>
			</div>
		</React.Fragment>
	);
};

export default Admin;
