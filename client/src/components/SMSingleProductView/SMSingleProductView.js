import React, { useState, useContext } from 'react';
import RatingModule from '../RatingModule/RatingModule';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import './SMSingleProductView.css'

const ColorSelector = (props) => {
	return (
		<div className='sm-single-product-view card p-5 container mt-4'>
			<button className='sm-single-product-view-close' onClick={()=> {props.onClose()}}>
				<i className='fa fa-close'></i>
			</button>
			<div className='row'>
				<div className='col-md-4'>
					<img
						className='product-view-image'
						src={props.product.images[0]}
						alt='product'
					/>
				</div>
				<div className='product-view-description-container col-md-8'>
					<p className='product-view-title'>{props.product.name}</p>
					<div className='single-product-view-rating d-flex'>
						<RatingModule rating={props.product.avgRating} />

						<p className='single-product-view-rating-value'>
							{props.product.avgRating}
						</p>

						<p
							className={
								props.product.availableQuantity > 0
									? 'single-product-view-available'
									: 'single-product-view-not-available'
							}
						>
							{props.product.availableQuantity >= 15
								? 'Available'
								: props.product.availableQuantity > 0 &&
								  props.product.availableQuantity < 15
								? 'Only ' +
								  props.product.availableQuantity +
								  ' Items are Available'
								: 'Not Available'}
						</p>
					</div>
					<p className='product-view-description'>
						{props.product.description}
					</p>

					<div className='d-flex'>
						<p className='single-product-view-price'>
							Rs. {props.product.price}.00
						</p>

						{moment().isSameOrBefore(
							props.product.discount.until
						) && props.product.discount.percentage ? (
							<p className='single-product-view-discount'>
								<span className='badge badge-success'>
									-{props.product.discount.percentage}%
								</span>{' '}
								Discount
							</p>
						) : null}
					</div>

					{moment().isSameOrBefore(props.product.discount.until) &&
					props.product.discount.percentage ? (
						<p className='single-product-view-discount-period'>
							{`Discount valid until : ${moment(
								props.product.discount.until
							).format('LL')}`}
						</p>
					) : (
						<br />
					)}

					<div className='d-flex bd-highlight'>
						<div className='bd-highlight'>
							<div
								className='product-view-color-selector-container'
								style={{
									border: `solid 1px #ccc`,
								}}
							>
								<label className='product-view-selected-color'>
									colors
								</label>
								{props.product.colors.map((color) => (
									<button
										className='product-view-color-selector'
										key={uuid()}
										style={{
											backgroundColor: `#${color.code}`,
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
									sizes
								</label>
								{props.product.sizes.map((size) => (
									<button
										className='product-view-size-selector'
										key={uuid()}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ColorSelector;
