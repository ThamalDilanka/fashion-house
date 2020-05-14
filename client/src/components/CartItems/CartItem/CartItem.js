import React, { useContext, useState } from "react";
import { CartContext } from "../../../contexts/CartContext";
import axios from "axios";

function CartItem(props) {
  const itemId = props.productId;

  const [cartItems, setCartItems] = useContext(CartContext);

  let [quantity, setQuantity] = useState(props.productQuantity);

  const increseQuantity = (itemId) => {
    //setQuantity(++quantity);

    axios
      .patch(`http://localhost:8000/api/v1/carts/${itemId}`, {

      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // axios
    //   .post("/user", {
    //     firstName: "Fred",
    //     lastName: "Flintstone",
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  const decreaseQuantity = (itemId) => {
    //setQuantity(--quantity);
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
        <strong>{`Rs. ${props.productPrice * quantity}`}</strong>
      </td>
      <td className="align-middle">
        <button
          onClick={() => decreaseQuantity(itemId)}
          className="badge badge-secondary"
        >
          -
        </button>
        <strong onChange={(e) => setQuantity(e.target.value)}>
          {quantity}
        </strong>
        <button
          onClick={() => increseQuantity(itemId)}
          className="badge badge-secondary"
        >
          +
        </button>
      </td>
      <td className="align-middle">
        <a href="#" className="text-dark">
          <i className="fa fa-2x fa-trash"></i>
        </a>
      </td>
    </tr>
  );
}

export default CartItem;
