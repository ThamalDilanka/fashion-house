import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCards from '../components/ProductCards/ProductCards';
import { Redirect } from 'react-router';

const ShowCase = (props) => {
	const [products, setProducts] = useState([]);
	const categoryIdHash = props.location.hash;
	const categoryId = categoryIdHash.substring(1);

	useEffect(() => {
		if (categoryId === '') {
			return;
		}

		axios
			.get(`http://localhost:8000/api/v1/products?category=${categoryId}`)
			.then((res) => setProducts(res.data.data.products))
			.catch((err) => console.log(err));
	}, []);

	return (
		<React.Fragment>
      {categoryId === '' ? <Redirect to='/not-found' /> : null}
			<div className='my-5 container'>
				<ProductCards products={products} />
			</div>
		</React.Fragment>
	);
};

export default ShowCase;
