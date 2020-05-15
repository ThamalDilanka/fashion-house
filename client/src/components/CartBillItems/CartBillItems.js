import React, { Fragment, useContext } from "react";
import CartBillItem from "./CartBillItem/CartBillItem";
import { CartContext } from "../../contexts/CartContext";

function CartBillItems() {

  const [cartItems, setcartItems] = useContext(CartContext)

  return (
    <Fragment>
      {cartItems.map((cartItem) => (
        <CartBillItem
          key={cartItem.productId}
          productName={cartItem.productName}
          productPrice={cartItem.productPrice}
          productQuantity={cartItem.productQuantity}
          productSize={cartItem.productSize}
          productColor={cartItem.productColor}
        />
      ))}
    </Fragment>
  );
}

export default CartBillItems;