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
	return (
		<React.Fragment>
			<h3>Dashboard</h3>
			<hr />

			<div className='row'>
				<div className='col-md-4'>
					<div className='card bg-c-blue order-card'>
						<div className='card-block'>
							<h6 className='m-b-20'>Orders Received</h6>
							<h2 className='text-right'>
								<i className='fa fa-cart-plus f-left'></i>
								<span>486</span>
							</h2>
							<p className='m-b-0'>
								Completed Orders
								<span className='f-right'>351</span>
							</p>
						</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='card bg-c-green order-card'>
						<div className='card-block'>
							<h6 className='m-b-20'>Orders Received</h6>
							<h2 className='text-right'>
								<i className='fa fa-rocket f-left'></i>
								<span>486</span>
							</h2>
							<p className='m-b-0'>
								Completed Orders
								<span className='f-right'>351</span>
							</p>
						</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='card bg-c-yellow order-card'>
						<div className='card-block'>
							<h6 className='m-b-20'>Orders Received</h6>
							<h2 className='text-right'>
								<i className='fa fa-refresh f-left'></i>
								<span>486</span>
							</h2>
							<p className='m-b-0'>
								Completed Orders
								<span className='f-right'>351</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default AdminDashboard;
