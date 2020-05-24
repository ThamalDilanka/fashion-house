import React, { useState, useEffect } from 'react';
import Session from '../util/Session';
import { Link, Redirect, Switch, Route } from 'react-router-dom';

import axios from 'axios';

// Components
import CategoryCards from '../components/CategoryCards/CategoryCards';

const Home = (props) => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8000/api/v1/categories')
			.then((res) => {
				console.log(res.data);
				setCategories([...res.data.data.categories]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<React.Fragment>
			{Session.getRole() === 'store-manager' ? (
				<Redirect to='/store-manager' />
			) : null}
			{Session.getRole() === 'admin' ? <Redirect to='/admin' /> : null}
			<div className='container'>
				<CategoryCards categories={categories} />
			</div>
		</React.Fragment>
	);
};

export default Home;
