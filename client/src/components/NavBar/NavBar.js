import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { CartContext } from '../../contexts/CartContext';

const NavBar = (props) => {
	const [cartItems] = useContext(CartContext);

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
					<Link to='/cart' className='nav-item nav-link'>
						Cart{' '}
						<span className='badge badge-secondary'>
							{cartItems.length}
						</span>
					</Link>
					<Link to='/authenticator/login' className='nav-item nav-link'>
						Login
					</Link>
					<Link to='/authenticator/login' className='nav-item nav-link'>
						<img className="nav-bar-profile-image rounded-circle" src="https://ui-avatars.com/api/?name=User+NameL&background=8c03ba&color=fff"/>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
