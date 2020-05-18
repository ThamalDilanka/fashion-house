import React from "react";
import SingleProductView from "../components/SingleProductView/SingleProductView";

const ProductView = (props) => {

	const productIdHash = props.location.hash;
	const productId = productIdHash.substring(1);

	// console.log(props.discount , props.images, props.avgRating, props.name, props.category, props.quantity, props.price, props.description)

	console.log(props.location.state.availableQuantitynpm)

	return (
		<div>
			<SingleProductView
				colors={[
					{ name: "Pinkish Red", code: "e76f51" },
					{ name: "Light Yellow", code: "f4a261" },
					{ name: "Yellow", code: "e9c46a" },
					{ name: "Water Blue", code: "2a9d8f" },
					{ name: "Dark Gray", code: "264653" },
				]}
				sizes={["XXS", "XS", "S", "M", "L", "XL", "XXL"]}

				discount = {props.location.state.discount}
				image = {props.location.state.image}
				// sizes = {props.location.statesizes}
				// colors = {props.location.statecolors}
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
