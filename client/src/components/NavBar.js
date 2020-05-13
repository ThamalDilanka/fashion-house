import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = (props) => {
	return (
		<div>
			<header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/cart">My Cart</Link></li>
                        <li><Link to="/wish-list">My Wish List</Link></li>
                        <li><Link to="/product-view">Product View</Link></li>
                    </ul>
                </nav>
            </header>
		</div>
	);
};

export default NavBar;