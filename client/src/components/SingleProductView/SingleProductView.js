import React, { useState } from 'react';
import RatingModule from '../RatingModule/RatingModule';
import uuid from 'uuid';
import './SingleProductView.css';

const ColorSelector = (props) => {
	const [selectedColor, setSelectedColor] = useState('select a color');
	const [selectedColorCode, setSelectedColorCode] = useState('ccc');
	const [selectedSize, setSelectedSize] = useState('select the size');

	const discount = props.discount;

	return (
		<div className='container mt-4'>
			<div className='row'>
				<div className='col-md-4'>
					<img
						className='product-view-image'
						src={`./images/products/${props.image}`}
						alt='product'
					/>
				</div>
				<div className='product-view-description-container col-md-8'>
					<p className='product-view-title'>
						{props.name}
					</p>
					<div className='single-product-view-rating d-flex'>
						<RatingModule rating={props.avgRating} />

						<p className='single-product-view-rating-value'>{props.avgRating}</p>

						<p className='single-product-view-availability'>
							Available
						</p>
					</div>
					<p className='product-view-description'>
						{props.description}
					</p>

					<div className='d-flex'>
						<p className='single-product-view-price'>Rs 4200</p>
						<p className='single-product-view-discount'>
							<span className='badge badge-success'>-30%</span>{' '}
							Discount
						</p>
					</div>
					<p className='single-product-view-discount-period'>
						Discount valid until 30 March 2020
					</p>

					<div className='d-flex bd-highlight'>
						<div className='bd-highlight'>
							<div
								className='product-view-color-selector-container'
								style={{
									border: `solid 1px #${selectedColorCode}`,
								}}
							>
								<label className='product-view-selected-color'>
									{selectedColor}
								</label>
								{props.colors.map((color) => (
									<button
										className='product-view-color-selector'
										key={uuid()}
										style={{
											backgroundColor: `#${color.code}`,
										}}
										onClick={() => {
											setSelectedColor(`${color.name}`);
											setSelectedColorCode(
												`${color.code}`
											);
										}}
									></button>
								))}
							</div>
						</div>
						<div className='single-product-view-size-container bd-highlight'>
							<div
								className='product-view-color-selector-container'
								style={{
									border: `solid 1px #ccc`,
								}}
							>
								<label className='product-view-selected-color'>
									{selectedSize}
								</label>
								{props.sizes.map((size) => (
									<button
										className='product-view-size-selector'
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

					<div className='product-view-btn-container'>
						<button
							type='button'
							className='favourite-btn btn btn-danger'
						>
							<i className='fa fa-heart-o'></i>
						</button>
						<button
							type='button'
							className='btn btn-primary float-right'
						>
							Add to cart
						</button>
						<button
							type='button'
							className='btn btn-primary float-right'
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
