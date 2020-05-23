import React, { useState, useEffect } from 'react';
import { store } from 'react-notifications-component';
import SMProductItems from '../SMProductItems/SMProductItems';
import Session from '../../util/Session';
import axios from 'axios';

// Assets
import './SMProductPanel.css';

const SMProductPanel = (props) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/v1/products`, {
				headers: {
					Authorization: `Bearer ${Session.getToken()}`,
				},
			})
			.then((res) => setProducts(res.data.data.products))
			.catch((err) => console.log(err));
	}, []);

	return (
		<React.Fragment>
			<div className='backend container'>
				<h3>All The Product Items</h3>
                <p className='m-0'>Double click to see the customer view</p>
				<br />
				<SMProductItems products={products}></SMProductItems>
			</div>
		</React.Fragment>
	);
};

export default SMProductPanel;
