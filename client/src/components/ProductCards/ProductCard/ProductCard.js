import React from 'react';
import { Link } from 'react-router-dom'
import './ProductCard.css'
import discountPic from './discount.png'

const ProductCard = (props) => {

	return (
        <div className="product-card col mb-4">
        <div className="card shadow no-padding">
            <div className="d-flex bd-highlight">
                <img className="product-discount-tag" src={props.discount.percentage ? discountPic : null} alt=""/>
                <p className="product-discount-value">{props.discount.percentage ? `Discount ${props.discount.percentage}` : null }</p>
                <div className="product-card-image-container">
                    <img src={`./images/products/${props.image}`}/>
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
                        <span className="fa fa-star checked" style={{color: 'orange'}}></span>
                        <span className="fa fa-star checked" style={{color: 'orange'}}></span>
                        <span className="fa fa-star checked" style={{color: 'orange'}}></span>
                        <span className="fa fa-star" style={{color: 'orange'}}></span>
                        <span className="fa fa-star"></span>
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