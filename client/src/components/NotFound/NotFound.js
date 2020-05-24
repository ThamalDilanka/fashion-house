import React from 'react';
import './NotFound.css';
import emoji from '../../images/emoji.png';

const NotFound = () => {
	return (
		<div id='notfound'>
			<div class='notfound'>
				<h1>404</h1>
				<h2>Oops! Page Not Be Found</h2>
				<p>
					Sorry but the page you are looking for does not exist, have
					been removed. name changed or is temporarily unavailable
				</p>
			</div>
		</div>
	);
};

export default NotFound;
