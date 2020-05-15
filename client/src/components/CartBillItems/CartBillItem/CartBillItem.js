import React from "react";

function CartBillItem(props) {
  return (
    <li className="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 className="my-0">{props.productName}</h6>
        <small className="text-muted">Quantity : {props.productQuantity}</small>
        <br />
        <small className="text-muted">Size : {props.productSize}</small>
        <br />
        <small className="text-muted">Color : {props.productColor}</small>
        <br />
      </div>
      <span className="text-muted">{`Rs. ${
        props.productPrice * props.productQuantity
      }`}</span>
    </li>
  );
}

export default CartBillItem;
