import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = (props) => {
	return (
		<div className='PRODUCT-CARD col mb-4'>
			<div className='card no-padding'>
				<div className='card-body no-padding'>
					<div className='d-flex bd-highlight'>
						<div className='p-2 flex-fill bd-highlight product-item-image-container'>
							<img
								src='https://i.ibb.co/LQfBw6V/Women-High-Neck-Puff-Long-Sleeve-T-Shirt-Ladies-Casual-Plain-Slim-Blouse-Tops-UK.jpg'
								className='card-img-top'
							/>
						</div>
						<div className='p-2 flex-fill bd-highlight'>
							<div className='no-padding title-container'>
								<p className='no-margin product-title'>
									Women's Lace Hollow V Neck T Shirt Ladies
									Casual Slim Fit Long Sleeve Blouse Tops
								</p>
							</div>

							<div className='d-flex bd-highlight mb-3 no-margin'>
								<div className='p-2 bd-highlight no-padding-left'>
									<span
										className='fa fa-star checked'
										style={{ color: 'orange' }}
									></span>
									<span
										className='fa fa-star checked'
										style={{ color: 'orange' }}
									></span>
									<span
										className='fa fa-star checked'
										style={{ color: 'orange' }}
									></span>
									<span
										className='fa fa-star'
										style={{ color: 'orange' }}
									></span>
									<span className='fa fa-star'></span>
								</div>
								<div className='p-2 bd-highlight'>4.6</div>
							</div>

							<div className='no-padding title-container'>
								<p className='no-margin product-description'>
									Women's Lace Hollow V Neck T Shirt Ladies
									Casual Slim Fit Long Sleeve Blouse Tops
								</p>
							</div>

							<div className='product-btn-container d-flex bd-highlight mb-3 no-margin'>
								<div className='no-padding-left  mr-auto p-2 bd-highlight'>
									<button
										type='button'
										className='btn btn-outline-warning btn-sm'
									>
										<i className='fa fa-heart-o'></i>
									</button>
								</div>
								<div className='p-2 bd-highlight'>
									<button
										type='button'
										className='btn btn-primary btn-sm'
									>
										View
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
