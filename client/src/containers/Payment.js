import React, { useState, useEffect, useMemo, useContext } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import moment from 'moment';
import axios from 'axios';
import Session from '../util/Session';
import CartBillItem from '../components/CartBillItems/CartBillItem/CartBillItem';
import Swal from 'sweetalert2';
import { CartContext } from '../contexts/CartContext';

const Payment = (props) => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');

  const [customerName, setcustomerName] = useState('');
  const [customerAddress, setcustomerAddress] = useState('');
  const [customerDistrict, setcustomerDistrict] = useState('');
  const [customerZip, setcustomerZip] = useState('');

  const [orderItems, setorderItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isCheckedforFuturePurpose, setisCheckedforFuturePurpose] = useState(
    false
  );

  const [cartItems, setcartItems] = useContext(CartContext);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  const handleNameChange = (e) => {
    setcustomerName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setcustomerAddress(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setcustomerDistrict(e.target.value);
  };

  const handleZipChange = (e) => {
    setcustomerZip(e.target.value);
  };

  const confirmCardPayment = () => {
    if (customerName === '') {
      Swal.fire('Customer Name is Required');
    } else if (customerAddress === '') {
      Swal.fire('Customer Address is Required');
    } else if (customerDistrict === '') {
      Swal.fire('District is Required');
    } else if (customerZip === '') {
      Swal.fire('Zip is Required');
    } else if (name === '') {
      Swal.fire('Name on card is Required');
    } else if (number === '') {
      Swal.fire('Card Number is Required');
    } else if (expiry === '') {
      Swal.fire('Expiry date is Required');
    } else if (cvc === '') {
      Swal.fire('CVV is Required');
    } else {
      const orderItemsToSave = [];

      orderItems.forEach((item) => {
        const product = {
          productId: item.product,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        };

        orderItemsToSave.push(product);
      });

      if (isCheckedforFuturePurpose) {
        axios
          .patch(
            `http://localhost:8000/api/v1/users/${Session.getId()}`,
            {
              address: customerAddress,
              district: customerDistrict,
              zip: customerZip,
            },
            config
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }

      axios
        .post(
          'http://localhost:8000/api/v1/orders',
          {
            user: Session.getId(),
            products: orderItemsToSave,
            totalAmount: total,
            discountAmount: discount,
            paymentMethod: 'card-payment',
          },
          config
        )
        .then((res) => {
          orderItems.forEach((orderItem) => {
            axios
              .delete(
                `http://localhost:8000/api/v1/carts/${orderItem._id}`,
                config
              )
              .then()
              .catch((err) => console.log(err));
          });
          setcartItems([]);
          Swal.fire(
            'Order Confirmed!',
            'Your order has been confirmed.',
            'success'
          ).then(props.history.push('/cart'));
        })
        .catch((err) => console.log(err));

      setorderItems([]);
      setTotal(0);
    }
  };

  const confirmCashOnDeliveryPayment = () => {
    if (customerName === '') {
      Swal.fire('Customer Name is Required');
    } else if (customerAddress === '') {
      Swal.fire('Customer Address is Required');
    } else if (customerDistrict === '') {
      Swal.fire('District is Required');
    } else if (customerZip === '') {
      Swal.fire('Zip is Required');
    } else {
      const orderItemsToSave = [];

      orderItems.forEach((item) => {
        const product = {
          productId: item.product,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        };

        orderItemsToSave.push(product);
      });

      if (isCheckedforFuturePurpose) {
        axios
          .patch(
            `http://localhost:8000/api/v1/users/${Session.getId()}`,
            {
              address: customerAddress,
              district: customerDistrict,
              zip: customerZip,
            },
            config
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }

      axios
        .post(
          'http://localhost:8000/api/v1/orders',
          {
            user: Session.getId(),
            products: orderItemsToSave,
            totalAmount: total,
            discountAmount: discount,
            paymentMethod: 'cash-on-delivery-payment',
          },
          config
        )
        .then((res) => {
          orderItems.forEach((orderItem) => {
            axios
              .delete(
                `http://localhost:8000/api/v1/carts/${orderItem._id}`,
                config
              )
              .then()
              .catch((err) => console.log(err));
          });
          setcartItems([]);
          Swal.fire(
            'Order Confirmed!',
            'Your order has been confirmed.',
            'success'
          ).then(props.history.push('/cart'));
        })
        .catch((err) => console.log(err));

      setorderItems([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/users/${Session.getId()}`)
      .then((res) => {
        setcustomerName(res.data.data.user.name);

        if (res.data.data.user.address) {
          setcustomerAddress(res.data.data.user.address);
        }
        if (res.data.data.user.district) {
          setcustomerDistrict(res.data.data.user.district);
        }
        if (res.data.data.user.zip) {
          setcustomerZip(res.data.data.user.zip);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useMemo(() => {
    if (props.location.state !== undefined) {
      setorderItems(props.location.state.orderItems);

      let tempTotal = 0;
      let tempDiscount = 0;

      props.location.state.orderItems.forEach((item) => {
        if (
          item.productDiscount &&
          moment().isSameOrBefore(item.productDiscount.until) &&
          moment().isSameOrAfter(item.productDiscount.from) &&
          item.productDiscount.percentage
        ) {
          tempTotal +=
            (
              item.productPrice -
              item.productPrice * (item.productDiscount.percentage / 100)
            ).toFixed(2) * item.quantity;

          tempDiscount += (
            item.productPrice *
            (item.productDiscount.percentage / 100)
          ).toFixed(2);
        } else if (item.isSelected === true) {
          tempTotal += item.productPrice * item.quantity;
        }

        setTotal(tempTotal);
        setDiscount(tempDiscount);
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>CHECKOUT</h2>
      </div>

      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Billing Details</span>
            <span className="badge badge-primary badge-pill">
              {orderItems.length} Items
            </span>
          </h4>
          <ul className="list-group mb-3">
            {orderItems.map((item) => (
              <CartBillItem
                key={item._id}
                productName={item.productName}
                productPrice={item.productPrice}
                productQuantity={item.quantity}
                productSize={item.size}
                productColor={item.color}
                isSelected={item.isSelected}
                productDiscount={item.productDiscount}
              />
            ))}
            <li className="list-group-item d-flex justify-content-between bg-light">
              <span>
                <h5>Total Amount</h5>
              </span>
              <h4>
                <strong>Rs.{total}</strong>
              </h4>
            </li>
          </ul>
        </div>

        <div className="col-md-8 order-md-1">
          <h3 className="mb-3">Shipping Details</h3>

          <div className="row">
            <div className="col-md-12 mb-3">
              <label htmlFor="firstName">Customer name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={customerName}
                onChange={(e) => handleNameChange(e)}
                placeholder=""
                required
              />
              <div className="invalid-feedback">Customer name is required.</div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              onChange={(e) => handleAddressChange(e)}
              value={customerAddress}
              placeholder=""
              required
            />
            <div className="invalid-feedback">Address is required.</div>
          </div>

          <div className="row">
            <div className="col-md-7 mb-3">
              <label htmlFor="zip">District</label>
              <input
                type="text"
                className="form-control"
                id="zip"
                onChange={(e) => handleDistrictChange(e)}
                value={customerDistrict}
                placeholder=""
                required
              />
              <div className="invalid-feedback">District is required.</div>
            </div>
            <div className="col-md-5 mb-3">
              <label htmlFor="zip">Zip Code</label>
              <input
                type="number"
                className="form-control"
                id="zip"
                onChange={(e) => handleZipChange(e)}
                value={customerZip}
                placeholder=""
                required
              />
              <div className="invalid-feedback">Zip code required.</div>
            </div>
          </div>

          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              onChange={(e) => setisCheckedforFuturePurpose(e.target.checked)}
              checked={isCheckedforFuturePurpose || false}
              className="custom-control-input"
              id="save-info"
            />
            <label className="custom-control-label" htmlFor="save-info">
              Save this information for next time
            </label>
          </div>
          <hr className="mb-4" />

          <h3 className="mb-3">Payment Method</h3>

          <nav className="mt-4">
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link active"
                data-toggle="tab"
                href="#nav-cash-on-delivery"
                role="tab"
              >
                Cash on Delivery
              </a>
              <a
                className="nav-item nav-link"
                data-toggle="tab"
                href="#nav-card"
                role="tab"
              >
                By Card
              </a>
            </div>
          </nav>

          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade pb-3 pt-3" id="nav-card">
              <Cards
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focus}
              />

              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input
                    type="text"
                    name="number"
                    maxLength="16"
                    placeholder="Card Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input
                    type="text"
                    name="expiry"
                    maxLength="4"
                    placeholder="MM/YY Expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">CVV</label>
                  <input
                    type="text"
                    name="cvc"
                    maxLength="4"
                    placeholder="CVV"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                  />
                </div>
              </div>
              <button
                onClick={confirmCardPayment}
                className="btn btn-primary btn-lg btn-block mt-3"
              >
                Checkout
              </button>
            </div>

            <div
              className="tab-pane fade show active pb-5 pt-3"
              id="nav-cash-on-delivery"
            >
              {total > 0 ? (
                <div className="d-flex justify-content-center">
                  <div class="row">
                    <div class="col-sm">
                      <h4>
                        Pay the total amount of {total} at the delivery to your
                        doorstep.
                      </h4>{' '}
                    </div>
                    <div class="col-sm">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTPdSqZ2dkWZ74Cccb4FI9XbqoOwYhLvfMtCzDS-nhek8NfVxKp&usqp=CAU" />
                    </div>
                  </div>
                </div>
              ) : null}
              <button
                onClick={confirmCashOnDeliveryPayment}
                className="btn btn-primary btn-lg btn-block mt-3"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="pt-5 my-5"></footer>
    </div>
  );
};

export default Payment;
