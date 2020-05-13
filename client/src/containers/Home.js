import React from 'react';
import ProductCards from '../components/ProductCards/ProductCards'

const Home = (props) => {
	return (
		<div>
			<h3>Home Page</h3>
			<div className="container">
				<ProductCards/>
			</div>
			
		</div>
	);
};

export default Home;