import React, { useState, useContext, useEffect } from 'react';
import { store } from 'react-notifications-component';
import { Link, Redirect } from 'react-router-dom';
import Session from '../../util/Session';
import { storage } from '../../firebase/config';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import { SwatchesPicker } from 'react-color';
import validator from 'validator';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import './AdminDashboard.css';

const AdminDashboard = (props) => {
	const [users, setUsers] = useState([]);
	const [orders, setOrders] = useState([]);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8000/api/v1/users', {
				headers: {
					Authorization: `Bearer ${Session.getToken()}`,
				},
			})
			.then((res) => {
				setUsers([...res.data.data.users]);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get('http://localhost:8000/api/v1/products', {
				headers: {
					Authorization: `Bearer ${Session.getToken()}`,
				},
			})
			.then((res) => {
				setProducts([...res.data.data.products]);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get('http://localhost:8000/api/v1/orders', {
				headers: {
					Authorization: `Bearer ${Session.getToken()}`,
				},
			})
			.then((res) => {
				setOrders([...res.data.data.orders]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<React.Fragment>
			<h3>Dashboard</h3>
			<hr />

			<div className='row'>
				<div className='col-md-4'>
					<div className='card bg-c-blue order-card'>
						<div className='card-block'>
							<h6 className='m-b-20'>Users</h6>
							<h2 className='text-right'>
								<i className='fa fa-user f-left'></i>
								<span>{users.length}</span>
							</h2>
						</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='card bg-c-green order-card'>
						<div className='card-block'>
							<h6 className='m-b-20'>Products</h6>
							<h2 className='text-right'>
								<i className='fa fa-rocket f-left'></i>
								<span>{products.length}</span>
							</h2>
						</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='card bg-c-yellow order-card'>
						<div className='card-block'>
							<h6 className='m-b-20'>Orders</h6>
							<h2 className='text-right'>
								<i className='fa fa-refresh f-left'></i>
								<span>{orders.length}</span>
							</h2>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default AdminDashboard;
