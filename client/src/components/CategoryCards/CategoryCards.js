import React from 'react';
import { Link } from 'react-router-dom'
import CategoryCard from './CategoryCard/CategoryCard'

const CategoryCards = (props) => {
	return (
        <div className="row row-cols-1 row-cols-xl-2 row-cols-md-2 row-cols-sm-1">
            {
                props.categories.map(category => (<CategoryCard category={category}/>))
            }
        </div>
	);
};

export default CategoryCards;