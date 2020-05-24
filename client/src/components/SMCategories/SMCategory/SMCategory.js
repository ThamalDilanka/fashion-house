import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Session from '../../../util/Session';
import { store } from 'react-notifications-component';
import axios from 'axios';
import './SMCategory.css';

const SMCategory = (props) => {
	const onUpdate = () => {
		props.updateCategory(props.category);
	};

	const onDelete = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: `Do you really want to remove ${props.category.name} from the system?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d92027',
			cancelButtonColor: '#12947f',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(
						`http://localhost:8000/api/v1/categories/${props.category._id}`,
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
							title: 'Category removed successfully',
							message: 'Tha action cannot be recovered',
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
						src={props.category.images[0]}
						alt='category'
						className='admin-panel-category-image'
					/>
				</th>
				<td>{props.category.title}</td>
				<td>{props.category.description}</td>
				<td>
					<button className='btn-edit' onClick={onUpdate}>
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

export default SMCategory;
