import React, { useContext } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import ProductCard from '../components/ProductCards/ProductCard/ProductCard';
import { Link } from 'react-router-dom';

const WishList = (props) => {
  const [FavouritesItems, setFavouritesItems] = useContext(FavouritesContext);

  return (
    <div className="conatiner m-5 row row-cols-1 row-cols-xl-1 row-cols-md-1 row-cols-sm-1">

      {FavouritesItems.length !== 0 ? (
        FavouritesItems.map((item) => {
          return (
            <ProductCard
              key={item.product}
              id={item.product}
              discount={item.productDiscount}
              image={item.productImage}
              sizes={item.productSizes}
              colors={item.productColors}
              avgRating={item.productAvgRating}
              name={item.productName}
              availableQuantity={item.productAvailableQuantity}
              price={item.productPrice}
              description={item.productDescription}
            />
			
          );
        })
      ) : (
		<div>
		<h2>No items in the Wishlist</h2>

		<Link to="/">
		  {' '}
		  <h3>See our products</h3>{' '}
		</Link>
	  </div>
      )}
    </div>
  );
};

export default WishList;
