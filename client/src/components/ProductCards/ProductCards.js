import React from 'react';
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard/ProductCard'

const ProductCards = (props) => {
	return (
        <div className="row row-cols-1 row-cols-xl-2 row-cols-md-2 row-cols-sm-1">
            {
                props.products.map(product => (
                    <ProductCard
                        key = {product._id}
                        id = {product._id}
                        discount = {product.discount}
                        image ={product.images[0]}
                        sizes = {product.sizes}
                        colors = {product.colors}
                        avgRating = {product.avgRating}
                        name = {product.name}
                        categoryId = {product.category}
                        availableQuantity = {product.quantity}
                        price = {product.price}
                        description = {product.description}
                    />
                ))
            }
        </div>
	);
};

export default ProductCards;