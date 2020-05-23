import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Session from '../../util/Session';
import { store } from 'react-notifications-component';
import './NavBar.css';
import axios from 'axios';

// Components
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import { FavouritesContext } from '../../contexts/FavouritesContext';

const NavBar = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  const [cartItems, setcartItems] = useContext(CartContext);
  const [FavouritesItems, setFavouritesItems] = useContext(FavouritesContext);

  const onLogoutClick = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');

    // Show a notification
    store.addNotification({
      title: 'Good Bye!',
      message: 'You have logged out successfully. See you soon.',
      type: 'success',
      insert: 'top-right',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 2000,
        showIcon: true,
      },
    });
    setcartItems([]);
    setFavouritesItems([]);
  };

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      //to display number of cart items immediate after the login
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };

      axios
        .get(
          `http://localhost:8000/api/v1/carts?user=${Session.getId()}`,
          config
        )
        .then((res) => {
          let arrtemp = res.data.data.carts;

          arrtemp.forEach((item) => {
            axios
              .get(`http://localhost:8000/api/v1/products/${item.product}`)
              .then((res) => {
                arrtemp = arrtemp.map((arrItem) => {
                  return arrItem.product === item.product
                    ? {
                        ...arrItem,
                        productName: res.data.data.product.name,
                        productImage: res.data.data.product.images[0],
                        productPrice: res.data.data.product.price,
                        productAvailableQuantity:
                          res.data.data.product.quantity,
                        isSelected: false,
                      }
                    : arrItem;
                });
                return arrtemp;
              })
              .then((res) => setcartItems(res))
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));

      //get favourites list to the context immediate after the login
      axios
        .get(
          `http://localhost:8000/api/v1/favourites?user=${Session.getId()}`,
          config
        )
        .then((res) => {
          let arrtemp = res.data.data.favourites;

          arrtemp.forEach((item) => {
            axios
              .get(`http://localhost:8000/api/v1/products/${item.product}`)
              .then((res) => {
                arrtemp = arrtemp.map((arrItem) => {
                  return arrItem.product === item.product
                    ? {
                        ...arrItem,
                        productName: res.data.data.product.name,
                        productImage: res.data.data.product.images[0],
                        productPrice: res.data.data.product.price,
                        productAvailableQuantity:
                          res.data.data.product.quantity,

                        productDiscount: res.data.data.product.discount,
                        productSizes: res.data.data.product.sizes,
                        productAvgRating: res.data.data.product.avgRating,
                        productDescription: res.data.data.product.description,
                        productColors: res.data.data.product.colors,
                      }
                    : arrItem;
                });
                return arrtemp;
              })
              .then((res) => setFavouritesItems(res))
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));
    }
  }, [localStorage.getItem('token')]);

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark"
      style={{ display: Session.getRole() === 'admin' ? 'none' : null }}
    >
      <Link className="navbar-brand" to="/">
        Fashion House
      </Link>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav"></div>
        <div className="navbar-nav ml-auto">
          <Link
            to={Session.isLoggedIn() ? '/wish-list' : '/authenticator/login'}
            className="nav-item nav-link"
          >
            Wish List{' '}
            <span className="badge badge-secondary">
              {FavouritesItems.length}
            </span>
          </Link>
          <Link
            to={Session.isLoggedIn() ? '/cart' : '/authenticator/login'}
            className="nav-item nav-link"
          >
            Cart{' '}
            <span className="badge badge-secondary">{cartItems.length}</span>
          </Link>

          {isLoggedIn ? (
            <React.Fragment>
              <Link
                to="/"
                className="nav-item nav-link"
                onClick={onLogoutClick}
              >
                Logout
              </Link>
              <Link to="/profile" className="nav-item nav-link">
                <img
                  className="nav-bar-profile-image rounded-circle"
                  src={Session.getImage()}
                  alt="profile"
                />
              </Link>
            </React.Fragment>
          ) : (
            <Link to="/authenticator/login" className="nav-item nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
