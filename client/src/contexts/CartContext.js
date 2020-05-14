import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider(props) {
  const [cartItems, setcartItems] = useState([
    {
      productId: 101,
      productName: "Product 1",
      productPrice: 300,
      productQuantity: 3,
      productSize: "L",
      productColor: "Blue",
    },
    {
      productId: 102,
      productName: "Product 2",
      productPrice: 400,
      productQuantity: 4,
      productSize: "M",
      productColor: "Green",
    },
    {
      productId: 103,
      productName: "Product 3",
      productPrice: 500,
      productQuantity: 5,
      productSize: "M",
      productColor: "Red",
    },
    {
      productId: 104,
      productName: "Product 4",
      productPrice: 900,
      productQuantity: 1,
      productSize: "L",
      productColor: "Maroon",
    },
  ]);

  return <CartContext.Provider value={[cartItems, setcartItems]}>{props.children}</CartContext.Provider>;
}
