import React, { useContext, useState } from 'react';
import CartItem from './CartItem/CartItem';
import { CartContext } from '../../contexts/CartContext';

function CartItems() {
  const [cartItems] = useContext(CartContext);

  return (
    <tbody>
      {cartItems.map((cartItem) => {
        return (
          <CartItem
            key={cartItem._id}
            cartItemId={cartItem._id}
            productName={cartItem.productName}
            product={cartItem.product}
            isSelected={cartItem.isSelected}
            productPrice={cartItem.productPrice}
            productQuantity={cartItem.quantity}
            productSize={cartItem.size}
            productColor={cartItem.color}
            productAvailableQuantity={cartItem.productAvailableQuantity}
            isSelected={cartItem.isSelected}
            productImage={cartItem.productImage}
            productDiscount={cartItem.productDiscount}
          />
        );
      })}
    </tbody>
  );
}

export default CartItems;
