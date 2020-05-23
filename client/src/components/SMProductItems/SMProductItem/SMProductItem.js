import React, { useState } from 'react';
import './SMProductItem.css';
import Swal from 'sweetalert2';
import Session from '../../../util/Session';
import { store } from 'react-notifications-component';
import axios from 'axios';

const SMProductItem = (props) => {
	const displayDetails = (e) => {};

	return (
		<React.Fragment>
			<tr className='sm-product-list-row' onDoubleClick={displayDetails}>
				<td>
					<img src={props.product.images[0]} alt='' />
				</td>
				<td>
					<p>{props.product.name}</p>
				</td>
				<td>{props.product.price}</td>
				<td>{props.product.discount.percentage}</td>
				<td>{props.product.quantity}</td>
			</tr>
		</React.Fragment>
	);
};

export default SMProductItem;
