import React from 'react';
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard/ProductCard'

const ProductCards = (props) => {
	return (
        <div class="row row-cols-1 row-cols-xl-2 row-cols-md-2 row-cols-sm-1">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
	);
};

export default ProductCards;