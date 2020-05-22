import React, { useState, useContext } from 'react';
import RatingModule from '../RatingModule/RatingModule';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Session from '../../util/Session';
import axios from 'axios';
import { CartContext } from '../../contexts/CartContext';
import './SingleProductView.css';

const ColorSelector = (props) => {
	const [selectedColor, setSelectedColor] = useState('select a color');
	const [selectedColorCode, setSelectedColorCode] = useState('ccc');
	const [selectedSize, setSelectedSize] = useState('select the size');
	const [selectedQuantity] = useState(3);

	const [cartItems, setcartItems] = useContext(CartContext);

	const addToCart = () => {
		if (!Session.isLoggedIn()) {
			alert('Please Log in first');
		} else {
			const userId = Session.getId();
			const customerToken = localStorage.getItem('token');

			const productId = props.productId;
			const quantityToAdd = selectedQuantity;

			const size = selectedSize;
			const color = selectedColor;

			let foundCartItemId = null;
			let foundCartItemCurrentQuantity = 0;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + customerToken,
				},
			};

			cartItems.forEach((item) => {
				if (
					item.product === productId &&
					item.color === color &&
					item.size === size
				) {
					foundCartItemId = item._id;
					foundCartItemCurrentQuantity = item.quantity;
				}
			});

			if (foundCartItemId === null) {
				axios
					.post(
						'http://localhost:8000/api/v1/carts',
						{
							user: userId,
							size: size,
							quantity: quantityToAdd,
							product: props.productId,
							color: color,
						},
						config
					)
					.then((res) => {
						setcartItems([
							...cartItems,
							{
								color: res.data.data.cart.color,
								date: res.data.data.cart.date,
								product: res.data.data.cart.product,
								quantity: res.data.data.cart.quantity,
								size: res.data.data.cart.size,
								user: res.data.data.cart.user,
								_id: res.data.data.cart._id,
								productAvailableQuantity: props.availableQuantity,
								productName: props.name,
								productPrice: props.price,
							},
						]);
					});
			} else {
				axios
					.patch(
						`http://localhost:8000/api/v1/carts/${foundCartItemId}`,
						{
							quantity: quantityToAdd + foundCartItemCurrentQuantity,
						},
						config
					)
					.then((res) => console.log(res.data.data))
					.catch((err) => console.log(err));
			}
		}
	};

	return (
		<div className="container mt-4">
			<div className="row">
				<div className="col-md-4">
					<img
						className="product-view-image"
						src={`./images/products/${props.image}`}
						alt="product"
					/>
				</div>
				<div className="product-view-description-container col-md-8">
					<p className="product-view-title">{props.name}</p>
					<div className="single-product-view-rating d-flex">
						<RatingModule rating={props.avgRating} />

						<p className="single-product-view-rating-value">
							{props.avgRating}
						</p>

						<p
							className={
								props.availableQuantity > 0
									? 'single-product-view-available'
									: 'single-product-view-not-available'
							}
						>
							{props.availableQuantity >= 15
								? 'Available'
								: props.availableQuantity > 0 && props.availableQuantity < 15
								? 'Only ' + props.availableQuantity + ' Items are Available'
								: 'Not Available'}
						</p>
					</div>
					<p className="product-view-description">{props.description}</p>

					<div className="d-flex">
						<p className="single-product-view-price">Rs. {props.price}.00</p>

						{moment().isSameOrBefore(props.discount.until) &&
						props.discount.percentage ? (
							<p className="single-product-view-discount">
								<span className="badge badge-success">
									-{props.discount.percentage}%
								</span>{' '}
								Discount
							</p>
						) : null}
					</div>

					{moment().isSameOrBefore(props.discount.until) &&
					props.discount.percentage ? (
						<p className="single-product-view-discount-period">
							{`Discount valid until : ${moment(props.discount.until).format(
								'LL'
							)}`}
						</p>
					) : (
						<br />
					)}

					<div className="d-flex bd-highlight">
						<div className="bd-highlight">
							<div
								className="product-view-color-selector-container"
								style={{
									border: `solid 1px #${selectedColorCode}`,
								}}
							>
								<label className="product-view-selected-color">
									{selectedColor}
								</label>
								{props.colors.map((color) => (
									<button
										className="product-view-color-selector"
										key={uuid()}
										style={{
											backgroundColor: `#${color.code}`,
										}}
										onClick={() => {
											setSelectedColor(`${color.name}`);
											setSelectedColorCode(`${color.code}`);
										}}
									></button>
								))}
							</div>
						</div>
						<div className="single-product-view-size-container bd-highlight">
							<div
								className="product-view-color-selector-container"
								style={{
									border: `solid 1px #ccc`,
								}}
							>
								<label className="product-view-selected-color">
									{selectedSize}
								</label>
								{props.sizes.map((size) => (
									<button
										className="product-view-size-selector"
										key={uuid()}
										onClick={() => {
											setSelectedSize(size);
										}}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					</div>

					<div className="product-view-btn-container">
						<button type="button" className="favourite-btn btn btn-danger">
							<i className="fa fa-heart-o"></i>
						</button>
						<button
							onClick={addToCart}
							type="button"
							className="btn btn-primary float-right"
						>
							Add to cart
						</button>
						<button
							type="button"
							className="btn btn-primary float-right"
							style={{ margin: '0px 10px' }}
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ColorSelector;
