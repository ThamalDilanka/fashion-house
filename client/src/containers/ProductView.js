import React from 'react';
import SingleProductView from '../components/SingleProductView/SingleProductView';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import Reviews from '../components/Reviews/Reviews';

const ProductView = (props) => {
	const productIdHash = props.location.hash;
	const productId = productIdHash.substring(1);

	return (
		<React.Fragment>
			{productId === '' ? (
				<Redirect to='/not-found' />
			) : (
				<React.Fragment>
					<SingleProductView
						productId={productId}
						discount={props.location.state.discount}
						image={props.location.state.image}
						sizes={props.location.state.sizes}
						colors={props.location.state.colors}
						avgRating={props.location.state.avgRating}
						name={props.location.state.name}
						categoryId={props.location.state.categoryId}
						availableQuantity={
							props.location.state.availableQuantity
						}
						price={props.location.state.price}
						description={props.location.state.description}
					/>
					<br />

					<Reviews productId={productId}></Reviews>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default ProductView;
