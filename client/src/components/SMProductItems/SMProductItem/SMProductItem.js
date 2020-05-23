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

	const onDelete = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: `Do you really want to remove ${props.product.name} from the system?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d92027',
			cancelButtonColor: '#12947f',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(
						`http://localhost:8000/api/v1/products/${props.product._id}`,
						{
							headers: {
								Authorization: `Bearer ${Session.getToken()}`,
							},
						}
					)
					.then((res) => {
						props.updateComponent();

						// Show a notification
						store.addNotification({
							title: 'Product removed successfully',
							message:
								'The product no longer appear in the store',
							type: 'danger',
							insert: 'top-right',
							container: 'top-right',
							animationIn: ['animated', 'fadeIn'],
							animationOut: ['animated', 'fadeOut'],
							dismiss: {
								duration: 3000,
								showIcon: true,
							},
						});
					})
					.catch((err) => {
						console.log(err.response);
					});
			}
		});
	};

	return (
		<React.Fragment>
			<tr
				className='sm-product-list-row'
				onDoubleClick={displayDetails}
				onSelect={() => {
					return false;
				}}
			>
				<td>
					<img src={props.product.images[0]} alt='' />
				</td>
				<td>
					<p>{props.product.name}</p>
				</td>
				<td>{props.product.price}</td>
				<td>{props.product.discount.percentage}</td>
				<td>{props.product.quantity}</td>
				<td>
					<button className='btn-edit'>
						<i
							className='fa  fa-pencil-square-o'
							aria-hidden='true'
						></i>
					</button>
					<button className='btn-delete' onClick={onDelete}>
						<i
							className='fa fa-minus-circle'
							aria-hidden='true'
						></i>
					</button>
				</td>
			</tr>
		</React.Fragment>
	);
};

export default SMProductItem;
