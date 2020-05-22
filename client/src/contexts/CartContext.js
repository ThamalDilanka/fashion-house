import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider(props) {
	const [cartItems, setcartItems] = useState([]);

	//sample obj :-

	// color: "blue"
	// date: null
	// product: "5ebc2c3451b71c30581afd80"
	// productAvailableQuantity: 20
	// productName: "sample product"
	// productPrice: 3200
	// isSelected : false
	// quantity: 1
	// productDiscount: res.data.data.product.discount,
	// size: "L"
	// user: "5ec0c6e219ef340928857ffe"
	// __v: 0
	// _id: "5ebe08c8f3c5071a5809a722"
	// __proto__: Object

	/**
   *  cart POST eken return wena obj eka:---
   *     
      color: "select a color"
      date: "2020-05-18T18:19:53.365Z"
      product: "5ebc2c4751b71c30581afd81"
      quantity: 3
      size: "select the size"
      user: "5ec0c6e219ef340928857ffe"
      __v: 0
      _id: "5ec2d1cf3311832d688a88eb"
   */

	return (
		<CartContext.Provider value={[cartItems, setcartItems]}>
			{props.children}
		</CartContext.Provider>
	);
}
