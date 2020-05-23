import React, { useContext } from 'react';
import moment from 'moment';
import './ProductCard.css';
import discountPic from './discount.png';
import RatingModule from '../../RatingModule/RatingModule';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Session from '../../../util/Session';
import {FavouritesContext} from '../../../contexts/FavouritesContext';


const ProductCard = (props) => {

	const [favouritesItems, setFavouritesItems]  = useContext(FavouritesContext)

	const config = {
		headers: {
		  'Content-Type': 'application/json',
		  Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	  };

	const addToWishList = () => {
		//   axios
        //     .post(
        //       'http://localhost:8000/api/v1/favourites',
        //       {
		// 			user: Session.getId(),
		// 			product: props.id
        //       },
        //       config
		// 	)
		// 	.then(res => console.log(res.data))
		// 	.catch(err => console.log(err))

		console.log(favouritesItems)

	}

	return (
		<div className="product-card col mb-4">
			<div className="card shadow no-padding">
				<div className="d-flex bd-highlight">
					{props.discount && moment().isSameOrBefore(props.discount.until) &&
					moment().isSameOrAfter(props.discount.from) &&
					props.discount.percentage ? (
						<img
							className="product-discount-tag"
							src={discountPic}
							alt="product-discount"
						/>
					) : null}

					{props.discount && moment().isSameOrBefore(props.discount.until) &&
					moment().isSameOrAfter(props.discount.from) &&
					props.discount.percentage ? (
						<p className="product-discount-value">
							Discount {props.discount.percentage}%
						</p>
					) : null}

					<div className="product-card-image-container">
						<img src={props.image} alt={props.name} />
					</div>
					<div className="product-card-detail-container">
						<p className="product-card-title no-padding no-margin">
							{props.name}
						</p>
						<p className="product-card-price no-padding no-margin">
							Rs. {props.price}
						</p>
						<p className="product-card-description no-padding no-margin">
							{props.description}
						</p>

						{/* {`${(favouritesItems.foreach(item => {const val = false; if(item._id === props.id){val = true;} return val; })) ? 'favourite-btn-true' : 'favourite-btn-false' } */}

						<button onClick={addToWishList} type="button" className= "favourite-btn-false btn btn-secondary float-right">
							<i className="fa fa-heart"></i>
						</button>
					</div>
				</div>
				<div className="card-footer no-padding no-margin">
					<div className="product-card-rating-container d-flex bd-highlight mb-3 no-margin">
						<div className="p-2 bd-highlight no-padding-left no-margin">
							<RatingModule rating={props.avgRating} />
						</div>
						<div className="p-2 bd-highlight">{props.avgRating}</div>
					</div>
					<Link
						to={{
							pathname: '/product-view',
							hash: props.id,

							state: {
								discount: props.discount,
								image: props.image,
								sizes: props.sizes,
								colors: props.colors,
								avgRating: props.avgRating,
								name: props.name,
								categoryId: props.categoryId,
								availableQuantity: props.availableQuantity,
								price: props.price,
								description: props.description,
							},
						}}
					>
						<button className="product-view-btn">View</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
