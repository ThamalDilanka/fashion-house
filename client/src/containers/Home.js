import React, { useState, useEffect } from 'react';
import CategoryCards from '../components/CategoryCards/CategoryCards';
import axios from 'axios';

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
		
		<div className='container'>
			<CategoryCards categories={categories} />
		</div>
	);
};

export default Home;
