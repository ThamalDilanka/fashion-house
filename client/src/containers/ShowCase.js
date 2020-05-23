import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCards from '../components/ProductCards/ProductCards'


const ShowCase = (props) => {
	
	console.log(props.location.hash);

	const [products, setProducts] = useState([]);
	const categoryIdHash = props.location.hash; 
	const categoryId = categoryIdHash.substring(1); 

	useEffect(() => {
		axios.get(`http://localhost:8000/api/v1/products?category=${categoryId}`)
			.then(res => setProducts(res.data.data.products))
			.catch(err => console.log(err))
	}, [])
	
	return (
			<div className="my-5 container">
				<ProductCards products={products}/>
			</div>
	);
};

export default ShowCase;