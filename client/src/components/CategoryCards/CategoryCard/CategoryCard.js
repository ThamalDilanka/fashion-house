import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = (props) => {
	return (
		<div className='card'>
			<h3>{props.category.title}</h3>
			<p>{props.category.description}</p>
			<p>{props.category.image}</p>
		</div>
	);
};

export default CategoryCard;
