import React from 'react';
import moment from 'moment';

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
      <span className="text-muted">
        {' '}
        {props.productDiscount &&
        moment().isSameOrBefore(props.productDiscount.until) &&
        moment().isSameOrAfter(props.productDiscount.from) &&
        props.productDiscount.percentage ? (
          <strong>{`Rs. ${
            (
              props.productPrice -
              props.productPrice * (props.productDiscount.percentage / 100)
            ).toFixed(2) * props.productQuantity
          }`}</strong>
        ) : (
          <strong>{`Rs. ${props.productPrice * props.productQuantity}`}</strong>
        )}
      </span>
    </li>
  );
}

export default CartBillItem;
