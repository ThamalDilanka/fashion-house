import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css'

const CategoryCard = (props) => {

	return (
		 <div className="category-card card shadow">
		 	<div className="row">
				<div className="col-4">
				 	<img src={props.category.images[0]} alt="category"/>
			 	</div>
			 	<div className="col-8">
					<br/>
				 	<h1>{props.category.title}</h1>
				 	<h5>{props.category.description}</h5>
				 	<Link to={{
						 pathname: '/show-case',
						 hash: props.category._id,
					 }}>
 						<button className="category-view-btn">Open in the showcase</button>
					</Link>
					
				 </div>
		 	</div>
		</div>
	);
};

export default CategoryCard;
