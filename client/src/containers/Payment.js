import React, { useState, useContext, useEffect, useMemo } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import moment from 'moment';
import axios from 'axios';
import Session from '../util/Session';
import { CartContext } from '../contexts/CartContext';
import CartBillItem from '../components/CartBillItems/CartBillItem/CartBillItem';

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

	const [cartItems] = useContext(CartContext);

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

			let temp = 0;

			props.location.state.orderItems.forEach((item) => {
				if (
					item.productDiscount &&
					moment().isSameOrBefore(item.productDiscount.until) &&
					moment().isSameOrAfter(item.productDiscount.from) &&
					item.productDiscount.percentage
				) {
					temp +=
						(
							item.productPrice -
							item.productPrice * (item.productDiscount.percentage / 100)
						).toFixed(2) * item.quantity;
				} else if (item.isSelected === true) {
					temp += item.productPrice * item.quantity;
				}

				setTotal(temp);
			});
		}
	}, []);

	useMemo(() => {}, []);

	return (
		<div className="container">
			<div className="py-5 text-center">
				<h2>CHECKOUT</h2>
			</div>

			<div className="row">
				<div className="col-md-4 order-md-2 mb-4">
					<h4 className="d-flex justify-content-between align-items-center mb-3">
						<span className="text-muted">Billing Details</span>
						<span className="badge badge-secondary badge-pill">
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

					<form className="needs-validation">
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
								<div className="invalid-feedback">
									Customer name is required.
								</div>
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
											type="tel"
											name="number"
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
											type="tel"
											name="cvc"
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
							</div>

							<div
								className="tab-pane fade show active pb-5 pt-3"
								id="nav-cash-on-delivery"
							>
								<h4>
									Pay the total amount of TOTAL at the delivery to your
									doorstep.
								</h4>
							</div>
						</div>
					</form>
					<button
						onClick={() => {
							console.log(orderItems);
						}}
						className="btn btn-secondary btn-lg btn-block"
					>
						Checkout
					</button>
				</div>
			</div>

			<footer className="pt-5 my-5"></footer>
		</div>
	);
};

export default Payment;
