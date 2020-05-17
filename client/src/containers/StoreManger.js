import React ,{useEffect,useState}from 'react';
import DiscountCards from '../components/DiscountCards/DiscountCards';
import axios from 'axios';

const StoreManager = () => {
	const[discounts,setDiscounts] = useState([]);

	useEffect(() => {
		const fetchData = async() => {
			const resp = await axios.get('http://localhost:8000/api/v1/products');
			setDiscounts([...resp.data.data.products]);
		}
		fetchData();
	}, []);

	return (
		<div>
			<DiscountCards data={discounts}/>
		</div>
	);
};

export default StoreManager;