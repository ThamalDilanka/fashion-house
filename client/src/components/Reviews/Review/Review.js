import React, { useEffect, useState } from 'react';
import './Review.css';
import axios from 'axios';
import StarsRating from 'stars-rating';

const Review = (props) => {
	return (
		<React.Fragment>
			<div className='container'>
				<div className='product-review-card d-flex bd-highlight'>
					<div>
						<p className='no-margin'>{props.review.comment}</p>
						ratings: {props.review.rating}
						<StarsRating
							count={5}
							value={props.review.rating}
							size={24}
							color2={'#ffd700'}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Review;
