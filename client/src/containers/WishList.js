import React, { useContext } from 'react';
import Session from '../util/Session';
import { FavouritesContext } from '../contexts/FavouritesContext';
import ProductCard from '../components/ProductCards/ProductCard/ProductCard';
import { Link, Redirect } from 'react-router-dom';

const WishList = (props) => {
	const [FavouritesItems] = useContext(FavouritesContext);

	return (
		<React.Fragment>
			{Session.isLoggedIn() ? (
				Session.getRole() === 'customer' ? null : (
					<Redirect to='/not-fount' />
				)
			) : (
				<Redirect to='/not-fount' />
			)}
			<div className='conatiner m-5 row row-cols-1 row-cols-xl-1 row-cols-md-1 row-cols-sm-1'>
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
								availableQuantity={
									item.productAvailableQuantity
								}
								price={item.productPrice}
								description={item.productDescription}
							/>
						);
					})
				) : (
					<div>
						<h2>No items in the Wishlist</h2>

						<Link to='/'>
							{' '}
							<h3>See latest items</h3>{' '}
						</Link>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default WishList;
