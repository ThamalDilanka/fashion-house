import React from 'react';
import './ProductCard.css'
import discountPic from './discount.png'
import RatingModule from '../../RatingModule/RatingModule';

const ProductCard = (props) => {

	return (
        <div className="product-card col mb-4">
        <div className="card shadow no-padding">
            <div className="d-flex bd-highlight">
                <img className="product-discount-tag" src={props.discount.percentage ? discountPic : null} alt="product-discount"/>
                <p className="product-discount-value">{props.discount.percentage ? `Discount ${props.discount.percentage}` : null }</p>
                <div className="product-card-image-container">
                    <img src={`./images/products/${props.image}`} alt={props.name}/>
                </div>
                <div className="product-card-detail-container">
                    <p className="product-card-title no-padding no-margin">{props.name}</p>
                    <p className="product-card-price no-padding no-margin">Rs. {props.price}</p>
                    <p className="product-card-description no-padding no-margin">{props.description}</p>
                </div>
            </div>
            <div className="card-footer no-padding no-margin">
           
                <div className="product-card-rating-container d-flex bd-highlight mb-3 no-margin">
                    <div className="p-2 bd-highlight no-padding-left no-margin">
                        <RatingModule rating={props.avgRating}/>
                    </div>
                    <div className="p-2 bd-highlight">{props.avgRating}</div>
                </div>
                <button className="product-view-btn">View</button>
            </div>
        </div>
    </div>
	);
};

export default ProductCard;