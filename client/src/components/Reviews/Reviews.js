import React, { useEffect, useState } from 'react';
import Review from './Review/Review';
import axios from 'axios';
import Session from '../../util/Session';
import { header } from 'express-validator';
import StarsRating from 'stars-rating';

const Reviews = (props) => {
	const [productReviews, setProductReviews] = useState([]);
	const [newReview, setNewReview] = useState('');
	const [rating, setRating] = useState(undefined);

	const onChangeNewReview = (e) => {
		setNewReview(e.target.value);
	};

	const ratingChanged = (newRating) => {
		setRating(newRating);
	};

	const addReview = (e) => {
		if (newReview !== '' && rating !== undefined) {
			axios
				.post(
					'http://localhost:8000/api/v1/reviews',
					{
						date: Date.now(),
						user: Session.getId(),
						product: props.productId,
						comment: newReview,
						rating,
					},
					{
						headers: {
							Authorization: 'Bearer ' + Session.getToken(),
						},
					}
				)
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err.response);
				});
		}
	};

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/api/v1/reviews?product=${props.productId}`
			)
			.then((res) => {
				setProductReviews([...res.data.data.reviews]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<React.Fragment>
			<div className='container'>
				<br />
				<hr />
				<p>Reviews</p>

				{Session.isLoggedIn() ? (
					<React.Fragment>
						<div className='d-flex bd-highlight'>
							<div
								style={{ width: '100%' }}
								className='p-2 bd-highlight'
							>
								<input
									type='text'
									className='form-control'
									onChange={onChangeNewReview}
								/>
							</div>
							<div
								style={{ width: '200px' }}
								className='p-2 bd-highlight'
							>
								<StarsRating
									count={5}
									onChange={ratingChanged}
									value={rating}
									size={24}
									color2={'#ffd700'}
								/>
							</div>
							<div className='p-2 bd-highlight'>
								<button
									className='btn btn-info'
									onClick={addReview}
								>
									<i className='fa fa-plus'></i>
								</button>
							</div>
						</div>
					</React.Fragment>
				) : null}
				<div>
					{productReviews.map((review) => (
						<Review key={review._id} review={review}></Review>
					))}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Reviews;
