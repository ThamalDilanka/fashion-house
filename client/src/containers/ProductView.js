import React from 'react';
import SingleProductView from '../components/SingleProductView/SingleProductView';
import { Link, Redirect, Switch, Route } from 'react-router-dom';

const ProductView = (props) => {
	const productIdHash = props.location.hash;
	const productId = productIdHash.substring(1);

	return (
		<React.Fragment>
			{productId === '' ? (
				<Redirect to='/not-found' />
			) : (
				<SingleProductView
					productId={productId}
					discount={props.location.state.discount}
					image={props.location.state.image}
					sizes={props.location.state.sizes}
					colors={props.location.state.colors}
					avgRating={props.location.state.avgRating}
					name={props.location.state.name}
					categoryId={props.location.state.categoryId}
					availableQuantity={props.location.state.availableQuantity}
					price={props.location.state.price}
					description={props.location.state.description}
				/>
			)}
		</React.Fragment>
	);
};

export default ProductView;
