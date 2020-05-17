import React from 'react';
import moment from 'moment'
import './ProductCard.css'
import discountPic from './discount.png'
import RatingModule from '../../RatingModule/RatingModule';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {

    return (
        <div className="product-card col mb-4">
            <div className="card shadow no-padding">
                <div className="d-flex bd-highlight">

                    {moment().isSameOrBefore(props.discount.until) && props.discount.percentage ? <img className="product-discount-tag" src={discountPic} alt="product-discount" /> : null}

                    {moment().isSameOrBefore(props.discount.until) && props.discount.percentage ? <p className="product-discount-value">Discount {props.discount.percentage}%</p> : null}


                    <div className="product-card-image-container">
                        <img src={`./images/products/${props.image}`} alt={props.name} />

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
                            <RatingModule rating={props.avgRating} />
                        </div>
                        <div className="p-2 bd-highlight">{props.avgRating}</div>
                    </div>
                    <Link to={{
                        pathname: '/product-view',
                        hash: props.id,
                    }}>
                        <button className="product-view-btn">View</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;