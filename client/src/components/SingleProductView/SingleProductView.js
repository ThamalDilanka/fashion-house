import React, { useState, useContext, useMemo } from 'react';
import RatingModule from '../RatingModule/RatingModule';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Session from '../../util/Session';
import axios from 'axios';
import { CartContext } from '../../contexts/CartContext';
import './SingleProductView.css';
import Swal from 'sweetalert2';
import { FavouritesContext } from '../../contexts/FavouritesContext';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

const SingleProductView = (props) => {
  const [selectedColor, setSelectedColor] = useState('select a color');
  const [selectedColorCode, setSelectedColorCode] = useState('ccc');
  const [selectedSize, setSelectedSize] = useState('select the size');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [cartItems, setcartItems] = useContext(CartContext);
  const [favouritesItems, setFavouritesItems] = useContext(FavouritesContext);

  const customerToken = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + customerToken,
    },
  };

  const addToCart = () => {
    if (Session.isLoggedIn()) {
      if (selectedColor === 'select a color') {
        Swal.fire('Please Select a color');
      } else if (selectedSize === 'select the size') {
        Swal.fire('Please Select a size');
      } else {
        if (!Session.isLoggedIn()) {
          Swal.fire({
            title: 'Please Log in First!',
            text: "You won't be able to add products to cart without login",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          });
        } else {
          const userId = Session.getId();

          const productId = props.productId;
          const quantityToAdd = selectedQuantity;

          const size = selectedSize;
          const color = selectedColor;

          let foundCartItemId = null;
          let foundCartItemCurrentQuantity = 0;

          cartItems.forEach((item) => {
            if (
              item.product === productId &&
              item.color === color &&
              item.size === size
            ) {
              foundCartItemId = item._id;
              foundCartItemCurrentQuantity = item.quantity;
            }
          });

          if (foundCartItemId === null) {
            axios
              .post(
                'http://localhost:8000/api/v1/carts',
                {
                  user: userId,
                  size: size,
                  quantity: quantityToAdd,
                  product: props.productId,
                  color: color,
                },
                config
              )
              .then((res) => {
                setcartItems([
                  ...cartItems,
                  {
                    color: res.data.data.cart.color,
                    date: res.data.data.cart.date,
                    product: res.data.data.cart.product,
                    quantity: res.data.data.cart.quantity,
                    size: res.data.data.cart.size,
                    user: res.data.data.cart.user,
                    _id: res.data.data.cart._id,
                    productAvailableQuantity: props.availableQuantity,
                    productName: props.name,
                    productPrice: props.price,
                  },
                ]);
              });
          } else {
            axios
              .patch(
                `http://localhost:8000/api/v1/carts/${foundCartItemId}`,
                {
                  quantity: quantityToAdd + foundCartItemCurrentQuantity,
                },
                config
              )
              .then((res) => console.log(res.data.data))
              .catch((err) => console.log(err));
          }

          Swal.fire({
            title: 'Added to cart',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#0085d6',
            cancelButtonColor: '#022dd',
            confirmButtonText: 'Go to cart',
            cancelButtonText: 'Continue to shopping',
            reverseButtons: true,
          }).then((result) => {
            if (result.value) {
              props.history.push('/cart');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              props.history.push(`/show-case#${props.categoryId}`);
            }
          });
        }
      }
    } else {
      Swal.fire({
        title: 'Log in first!',
        text: 'You have to login first to do this.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.value) {
          props.history.push('/authenticator/login');
        }
      });
    }
  };

  const addToWishList = () => {
    if (Session.isLoggedIn()) {
      let isExist = false;

      favouritesItems.forEach((favItem) => {
        if (favItem.product === props.productId) {
          isExist = true;
        }
      });

      if (isExist === false) {
        Axios.post(
          'http://localhost:8000/api/v1/favourites',
          {
            user: Session.getId(),
            product: props.productId,
          },
          config
        )
          .then((res) =>
            setFavouritesItems([...favouritesItems, res.data.data.favourite])
          )
          .catch((err) => console.log(err));
      } else {
        favouritesItems.forEach((favItem) => {
          if (favItem.product === props.productId) {
            Axios.delete(
              `http://localhost:8000/api/v1/favourites/${favItem._id}`,
              config
            )
              .then(() => {
                setFavouritesItems(
                  favouritesItems.filter((item) => {
                    return favItem._id !== item._id;
                  })
                );
              })
              .catch((err) => console.log(err));
          }
        });
      }
    } else {
      Swal.fire({
        title: 'Log in first!',
        text: 'You have to login first to do this.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.value) {
          props.history.push('/authenticator/login');
        }
      });
    }
  };

  let color = 'text-white';

  useMemo(() => {
    favouritesItems.forEach((item) => {
      if (item.product === props.productId) {
        color = 'text-warning';
      }
    });
  }, [favouritesItems, selectedQuantity, selectedSize, selectedColor]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img className="product-view-image" src={props.image} alt="product" />
        </div>
        <div className="product-view-description-container col-md-8">
          <p className="product-view-title">{props.name}</p>
          <div className="single-product-view-rating d-flex">
            <RatingModule rating={props.avgRating} />

            <p className="single-product-view-rating-value">
              {props.avgRating}
            </p>

            <p
              className={
                props.availableQuantity > 0
                  ? 'single-product-view-available'
                  : 'single-product-view-not-available'
              }
            >
              {props.availableQuantity >= 15
                ? 'Available'
                : props.availableQuantity > 0 && props.availableQuantity < 15
                ? 'Only ' + props.availableQuantity + ' Items are Available'
                : 'Not Available'}
            </p>
          </div>
          <p className="product-view-description">{props.description}</p>

          <div className="d-flex">
            <p className="single-product-view-price">Rs. {props.price}.00</p>

            {props.discount &&
            moment().isSameOrBefore(props.discount.until) &&
            moment().isSameOrAfter(props.discount.from) &&
            props.discount.percentage ? (
              <p className="single-product-view-discount">
                <span className="badge badge-success">
                  -{props.discount.percentage}%
                </span>{' '}
                Discount
              </p>
            ) : null}
          </div>

          {props.discount &&
          moment().isSameOrBefore(props.discount.until) &&
          moment().isSameOrAfter(props.discount.from) &&
          props.discount.percentage ? (
            <p className="single-product-view-discount-period">
              {`Discount valid until : ${moment(props.discount.until).format(
                'LL'
              )}`}
            </p>
          ) : (
            <br />
          )}

          <div className="d-flex bd-highlight">
            <div className="bd-highlight">
              <div
                className="product-view-color-selector-container"
                style={{
                  border: `solid 1px #${selectedColorCode}`,
                }}
              >
                <label className="product-view-selected-color">
                  {selectedColor}
                </label>
                {props.colors
                  ? props.colors.map((color) => (
                      <button
                        className="product-view-color-selector"
                        key={uuid()}
                        style={{
                          backgroundColor: `#${color.code}`,
                        }}
                        onClick={() => {
                          setSelectedColor(`${color.name}`);
                          setSelectedColorCode(`${color.code}`);
                        }}
                      ></button>
                    ))
                  : null}
              </div>
            </div>
            <div className="single-product-view-size-container bd-highlight">
              <div
                className="product-view-color-selector-container"
                style={{
                  border: `solid 1px #ccc`,
                }}
              >
                <label className="product-view-selected-color">
                  {selectedSize}
                </label>
                {props.sizes
                  ? props.sizes.map((size) => (
                      <button
                        className="product-view-size-selector"
                        key={uuid()}
                        onClick={() => {
                          setSelectedSize(size);
                        }}
                      >
                        {size}
                      </button>
                    ))
                  : null}
              </div>
            </div>

            <div
              className="ml-4 btn-group"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                disabled={selectedQuantity === 1}
                onClick={(e) => {
                  setSelectedQuantity((prevQty) => prevQty - 1);
                }}
                className="btn btn-primary"
              >
                <strong>-</strong>
              </button>
              <button type="button" className="btn btn-light" disabled>
                <strong>{selectedQuantity}</strong>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setSelectedQuantity((prevQty) => prevQty + 1);
                }}
                className="btn btn-primary"
              >
                <strong>+</strong>
              </button>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col">
              <button
                onClick={addToWishList}
                type="button"
                className={`${color} favourite-btn btn btn-secondary float-left`}
              >
                <i className="fa fa-heart"></i>
              </button>
            </div>

            <div className="col">
              <button
                onClick={addToCart}
                type="button"
                className="btn btn-primary float-right"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SingleProductView);
