import React from 'react';
import { Link } from 'react-router-dom'
import CategoryCard from './CategoryCard/CategoryCard'

const CategoryCards = (props) => {
	return (
        <div>
            {
                props.categories.map(category => (<CategoryCard category={category} key={category._id}/>))
            }
        </div>
	);
};

export default CategoryCards;