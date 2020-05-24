import React, { useContext } from 'react';
import Session from '../util/Session';
import { AuthContext } from '../contexts/AuthContext';
import { store } from 'react-notifications-component';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import AddProduct from '../components/AddProduct/AddProduct';
import SMProductPanel from '../components/SMProductPanel/SMProductPanel';
import DiscountPanel from '../components/DiscountPanel/DiscountPanel';

const StoreManager = (props) => {
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
							alt='store-manager'
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
							<Link to='/store-manager/all-products'>
								<i className='fa fa-cubes'></i>All Products
							</Link>
						</li>
						<li>
							<Link to='/store-manager/add-products'>
								<i className='fa fa-plus'></i>Add Products
							</Link>
						</li>
						<li>
							<Link to='/store-manager/discounts'>
								<i className='fa fa-tags'></i>Add Discount
							</Link>
						</li>
					</ul>
				</div>

				<section className='admin-panel-content-container'>
					<Switch>
						<Route
							path='/store-manager/add-products'
							component={AddProduct}
						/>
						<Route
							path='/store-manager/all-products'
							component={SMProductPanel}
						/>
						<Route
							path='/store-manager/discounts'
							component={DiscountPanel}
						/>
					</Switch>
				</section>
			</div>
		</React.Fragment>
	);
};

export default StoreManager;
