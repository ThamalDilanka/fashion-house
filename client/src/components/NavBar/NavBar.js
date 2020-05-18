import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Session from '../../util/Session'
import { store } from 'react-notifications-component';
import './NavBar.css';

// Components
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';

const NavBar = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
	const [cartItems] = useContext(CartContext);

	const onLogoutClick = () => {
		setIsLoggedIn(false);
		localStorage.removeItem('token');

		// Show a notification
		store.addNotification({
			title: "Good Bye!",
			message: "You have logged out successfully. See you soon.",
			type: "success",
			insert: "top-right",
			container: "top-right",
			animationIn: ["animated", "fadeIn"],
			animationOut: ["animated", "fadeOut"],
			dismiss: {
			  duration: 2000,
			  showIcon: true
			}
		  });
	};

	return (
		<nav className='navbar navbar-expand-md navbar-dark bg-dark'>
			<Link className='navbar-brand' to='/'>
				Fashion House
			</Link>
			<button
				type='button'
				className='navbar-toggler'
				data-toggle='collapse'
				data-target='#navbarCollapse'
			>
				<span className='navbar-toggler-icon'></span>
			</button>

			<div className='collapse navbar-collapse' id='navbarCollapse'>
				<div className='navbar-nav'></div>
				<div className='navbar-nav ml-auto'>
					<Link to='/wish-list' className='nav-item nav-link'>
						Wish List{' '}
						<span className='badge badge-secondary'>1</span>
					</Link>
					<Link to={Session.isLoggedIn() ? '/cart' : '/authenticator/login'} className='nav-item nav-link'>
						Cart{' '}
						<span className='badge badge-secondary'>
							{cartItems.length}
						</span>
					</Link>

					{isLoggedIn ? (
						<React.Fragment>
							<Link
								to='/'
								className='nav-item nav-link'
								onClick={onLogoutClick}
							>
								Logout
							</Link>
							<Link
								to='/profile'
								className='nav-item nav-link'
							>
								<img
									className='nav-bar-profile-image rounded-circle'
									src={Session.getImage()}
									alt="profile"
								/>
							</Link>
						</React.Fragment>
					) : (
						<Link
							to='/authenticator/login'
							className='nav-item nav-link'
						>
							Login
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
