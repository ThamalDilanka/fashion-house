import React, { useState } from 'react';
import './SMProductItem.css';
import Swal from 'sweetalert2';
import Session from '../../../util/Session';
import { store } from 'react-notifications-component';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import SMSingleProductView from '../../SMSingleProductView/SMSingleProductView';

const SMProductItem = (props) => {
	const displayDetails = (e) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<SMSingleProductView
                        product={props.product}
                        onClose={onClose}
					></SMSingleProductView>
				);
			},
		});
	};

	return (
		<React.Fragment>
			<tr className='sm-product-list-row' onDoubleClick={displayDetails} onSelect={()=> {return false}}>
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
