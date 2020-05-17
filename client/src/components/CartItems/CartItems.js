import React, { useContext } from "react";
import CartItem from "./CartItem/CartItem";
import { CartContext } from "../../contexts/CartContext";

function CartItems() {

  const [cartItems] = useContext(CartContext)

  return (
    <tbody>
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.productId}
          productId={cartItem.productId}
          productName={cartItem.productName}
          productPrice={cartItem.productPrice}
          productQuantity={cartItem.productQuantity}
          productSize={cartItem.productSize}
          productColor={cartItem.productColor}
        />
      ))}
    </tbody>
  );
}

export default CartItems;
