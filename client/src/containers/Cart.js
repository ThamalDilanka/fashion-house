import React, { useState, useContext } from "react";
import CartItems from "../components/CartItems/CartItems";
import CartBillItems from "../components/CartBillItems/CartBillItems";
import { CartContext } from "../contexts/CartContext";

const Cart = (props) => {
  const [cartItems, setcartItems] = useContext(CartContext);
  let total = 0;
  {
    cartItems.forEach((item) => {
      total += item.productPrice * item.productQuantity;
    });
  }

  // const [cartItems, setcartItems] = useState([

  //   {
  //     productId : 101,
  //     productName : "Product 1",
  //     productPrice : 300,
  //     productQuantity : 3,
  //     productSize : "L",
  //     productColor : "Blue",
  //   },
  //   {
  //     productId : 102,
  //     productName : "Product 2",
  //     productPrice : 400,
  //     productQuantity : 4,
  //     productSize : "M",
  //     productColor : "Green",
  //   },
  //   {
  //     productId : 103,
  //     productName : "Product 3",
  //     productPrice : 500,
  //     productQuantity : 5,
  //     productSize : "M",
  //     productColor : "Red",
  //   },

  // ]);

  return (
    <div className="container-fuild p-5">
      <div className="row">
        <div className="col-md-8">
          {/* Table Starts */}
          <div className="row">
            <div className="col-sm-12 p-5 bg-white rounded shadow-sm mb-5">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 bg-light">
                        <div className="p-2 px-3 text-uppercase">Product</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Price</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Quantity</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase"></div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body starts*/}
                  {/* <CartItems cartItemList={cartItems}/> */}
                  <CartItems />
                  {/* Table body ends*/}
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* cart summary starts */}
        <div className="col-md-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your Bill</span>
            <span className="badge badge-secondary badge-pill">
              {cartItems.length} Items
            </span>
          </h4>
          <ul className="list-group mb-3">
            {/* <CartBillItems  cartBillItemList={cartItems}/> */}
            <CartBillItems />
            <li className="list-group-item d-flex justify-content-between bg-light">
              <span>
                <h4>Total Amount</h4>
              </span>
              <h2><strong>Rs.{total}</strong></h2>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <hr className="mb-4" />
              <button
                className="btn btn-secondary btn-lg btn-block"
                type="submit"
              >
                Continue to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
