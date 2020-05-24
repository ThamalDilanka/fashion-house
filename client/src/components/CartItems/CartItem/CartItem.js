import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../../contexts/CartContext';
import axios from 'axios';
import './CartItem.css';
import moment from 'moment';
import Swal from 'sweetalert2';

function CartItem(props) {
  const itemId = props.cartItemId;

  const customerToken = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + customerToken,
    },
  };

  const [cartItems, setCartItems] = useContext(CartContext);

  const removeCartItem = (itemId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        axios
          .delete(`http://localhost:8000/api/v1/carts/${itemId}`, config)
          .then(() => {
            setCartItems(
              cartItems.filter((item) => {
                return itemId !== item._id;
              })
            );
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const decreaseQuantity = (itemId, currentQty) => {
    axios
      .patch(
        `http://localhost:8000/api/v1/carts/${itemId}`,
        {
          quantity: currentQty - 1,
        },
        config
      )
      .then(() => {
        setCartItems((currentCartItems) =>
          currentCartItems.map((item) =>
            itemId === item._id ? { ...item, quantity: currentQty - 1 } : item
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const increseQuantity = (itemId, currentQty) => {
    axios
      .patch(
        `http://localhost:8000/api/v1/carts/${itemId}`,
        {
          quantity: currentQty + 1,
        },
        config
      )
      .then(() => {
        setCartItems((currentCartItems) =>
          currentCartItems.map((item) =>
            itemId === item._id ? { ...item, quantity: currentQty + 1 } : item
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (e, itemId) => {
    const isChecked = e.target.checked;

    setCartItems((currentCartItems) =>
      currentCartItems.map((item) =>
        itemId === item._id ? { ...item, isSelected: isChecked } : item
      )
    );
  };

  return (
    <tr>
      <td className="align-middle">
        <label>
          <input
            onChange={(e) => handleOnChange(e, itemId)}
            type="checkbox"
            name="check"
            checked={props.isSelected || false}
          />{' '}
          <span className="label-text"></span>
        </label>
      </td>
      <td className="align-middle">
        <img
          src={props.productImage}
          alt=""
          width="70"
          className="img-fluid rounded shadow-sm"
        />
        <div className="ml-3 d-inline-block align-middle">
          <h5 className="mb-0 text-dark">{props.productName}</h5>
          <span className="text-muted font-weight-normal">
            <small className="text-muted">Size : {props.productSize}</small>
            <br />
            <small className="text-muted">Color : {props.productColor}</small>
            <br />{' '}
            {props.productDiscount &&
            moment().isSameOrBefore(props.productDiscount.until) &&
            moment().isSameOrAfter(props.productDiscount.from) &&
            props.productDiscount.percentage ? (
              <small className="text-muted">
                <p className="single-product-view-discount-period">
                  {`Discount valid until : ${moment(
                    props.productDiscount.until
                  ).format('LL')}`}
                </p>
              </small>
            ) : null}
          </span>
        </div>
      </td>

      <td className="align-middle">
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
      </td>

      <td className="align-middle">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            onClick={() => decreaseQuantity(itemId, props.productQuantity)}
            disabled={props.productQuantity === 1}
            className="btn btn-primary"
          >
            <strong>-</strong>
          </button>
          <button type="button" className="btn btn-light" disabled>
            <strong>{props.productQuantity}</strong>
          </button>
          <button
            type="button"
            onClick={() => increseQuantity(itemId, props.productQuantity)}
            disabled={props.productQuantity === props.productAvailableQuantity}
            className="btn btn-primary"
          >
            <strong>+</strong>
          </button>
        </div>
      </td>
      <td className="align-middle">
        <a onClick={() => removeCartItem(itemId)}>
          <i className="text-danger fa fa-2x fa-trash"></i>
        </a>
      </td>
    </tr>
  );
}

export default CartItem;
