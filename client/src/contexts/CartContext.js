import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider(props) {

  const [cartItems, setcartItems] = useState([]);

  return <CartContext.Provider value={[cartItems, setcartItems]}>{props.children}</CartContext.Provider>;
}
