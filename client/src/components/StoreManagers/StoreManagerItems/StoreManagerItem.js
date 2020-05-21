import React from 'react';
import { Link } from 'react-router-dom';
import './StoreManagerItem.css';

const StoreManagerItem = (props) => {
	return (
		<React.Fragment>
			<tr>
				<th scope='row'>
					<img
						src={props.storeManager.image}
						alt='store-manager'
						className='admin-panel-store-manager-image rounded-circle'
					/>
				</th>
				<td>{props.storeManager.name}</td>
				<td>{props.storeManager.email}</td>
				<td>
					<button className='admin-panel-store-manager-action'>
						<i className='fa fa-user-times'></i>
					</button>
				</td>
			</tr>
		</React.Fragment>
	);
};

export default StoreManagerItem;
