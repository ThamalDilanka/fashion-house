import React, { Fragment, useContext } from "react";
import CartBillItem from "./CartBillItem/CartBillItem";
import { CartContext } from "../../contexts/CartContext";

function CartBillItems() {
  const [cartItems, setcartItems] = useContext(CartContext);

  return (
    <Fragment>
      {cartItems.map((cartItem) =>
        cartItem.isSelected ? (
          <CartBillItem
            key={cartItem._id}
            productName={cartItem.productName}
            productPrice={cartItem.productPrice}
            productQuantity={cartItem.quantity}
            productSize={cartItem.size}
            productColor={cartItem.color}
            isSelected={cartItem.isSelected}
          />
        ) : null
      )}
    </Fragment>
  );
}

export default CartBillItems;
