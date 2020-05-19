import React, { useContext, useState } from "react";
import CartItem from "./CartItem/CartItem";
import { CartContext } from "../../contexts/CartContext";

function CartItems() {

  const [cartItems] = useContext(CartContext)


  return (
    <tbody>
      {cartItems.map((cartItem, index) => {
        return(
        <CartItem
          key={cartItem._id}
          cartItemId={cartItem._id}
          productName={cartItem.productName}
          productPrice={cartItem.productPrice}
          productQuantity={cartItem.quantity}
          productSize={cartItem.size}
          productColor={cartItem.color}
          productAvailableQuantity={cartItem.productAvailableQuantity}
        />
        )
      })}
    </tbody>
  );
}

export default CartItems;
