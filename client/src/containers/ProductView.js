import React from "react";
import SingleProductView from "../components/SingleProductView/SingleProductView";

const ProductView = (props) => {

	const productIdHash = props.location.hash;
	const productId = productIdHash.substring(1);

	return (
		<div>
			<SingleProductView
		

				productId = {productId}
				discount = {props.location.state.discount}
				image = {props.location.state.image}
				sizes = {props.location.state.sizes}
				colors = {props.location.state.colors}
				avgRating = {props.location.state.avgRating}
				name = {props.location.state.name}
				categoryId = {props.location.state.categoryId}
				availableQuantity = {props.location.state.availableQuantity}
				price = {props.location.state.price}
				description = {props.location.state.description}
			/>
		</div>
	);
};

export default ProductView;
