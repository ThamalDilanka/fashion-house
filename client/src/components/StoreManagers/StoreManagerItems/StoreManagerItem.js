import React, { useState } from 'react';
import './StoreManagerItem.css';
import Swal from 'sweetalert2';
import Session from '../../../util/Session';
import { store } from 'react-notifications-component';
import axios from 'axios';

const StoreManagerItem = (props) => {
	const onDeleteStoreManager = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: `Do you really want to remove ${props.storeManager.name} from the system?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d92027',
			cancelButtonColor: '#12947f',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(
						`http://localhost:8000/api/v1/users/${props.storeManager._id}`,
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
							title: 'Store manager removed successfully',
							message:
								'He no longer have store manager privileges',
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
					<button
						className='admin-panel-store-manager-action'
						data-toggle='modal'
						data-target='#exampleModalCenter'
						onClick={onDeleteStoreManager}
					>
						<i className='fa fa-user-times'></i>
					</button>
				</td>
			</tr>
		</React.Fragment>
	);
};

export default StoreManagerItem;
