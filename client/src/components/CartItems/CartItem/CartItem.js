import React, { useContext, useState } from "react";
import { CartContext } from "../../../contexts/CartContext";
import axios from "axios";

function CartItem(props) {
  const itemId = props.productId;

  const [cartItems, setCartItems] = useContext(CartContext);

  const decreaseQuantity = (itemId, currentQty) => {
    setCartItems((currentCartItems) =>
      currentCartItems.map((item) =>
        itemId === item.productId
          ? { ...item, productQuantity: currentQty - 1 }
          : item
      )
    );
  };

  const increseQuantity = (itemId, currentQty) => {
    setCartItems((currentCartItems) =>
      currentCartItems.map((item) =>
        itemId === item.productId
          ? { ...item, productQuantity: currentQty + 1 }
          : item
      )
    );
  };

  const removeCartItem = (itemId) => {
    setCartItems(
      cartItems.filter((item) => {
        return itemId !== item.productId;
      })
    );
  };

  return (
    <tr>
      <th scope="row">
        <div className="p-2">
          <img
            src="https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-2_qxjis2.jpg"
            alt=""
            width="70"
            className="img-fluid rounded shadow-sm"
          />
          <div className="ml-3 d-inline-block align-middle">
            <h5 className="mb-0">
              <a href="#" className="text-dark d-inline-block">
                {props.productName}
              </a>
            </h5>
            <span className="text-muted font-weight-normal">
              <small className="text-muted">Size : {props.productSize}</small>
              <br />
              <small className="text-muted">Color : {props.productColor}</small>
              <br />
            </span>
          </div>
        </div>
      </th>

      <td className="align-middle">
        <strong>{`Rs. ${props.productPrice * props.productQuantity}`}</strong>
      </td>
      <td className="align-middle">
        <button
          onClick={() => decreaseQuantity(itemId, props.productQuantity)}
          className="badge badge-secondary"
          disabled={props.productQuantity === 1}
        >
          -
        </button>
        <strong>{props.productQuantity}</strong>
        <button
          onClick={() => increseQuantity(itemId, props.productQuantity)}
          className="badge badge-secondary"
        >
          +
        </button>
      </td>
      <td className="align-middle">
        <a onClick={() => removeCartItem(itemId)} className="text-dark">
          <i className="fa fa-2x fa-trash"></i>
        </a>
      </td>
    </tr>
  );
}

export default CartItem;
