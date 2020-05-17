import React from 'react';
import ColorSelector from '../components/ColorSelector/ColorSelector'
import SingleProductView from '../components/SingleProductView/SingleProductView'

const WishList = (props) => {
	return (
		<div>
			<br/>
			{/* <ColorSelector colors={
				[
					{name: "Pinkish Red", code: 'e76f51'},
					{name: "Light Yellow", code: 'f4a261'},
					{name: "Yellow", code: 'e9c46a'},
					{name: "Water Blue", code: '2a9d8f'},
					{name: "Dark Gray", code: '264653'}
				]
			}/>
			<br/> */}

			<SingleProductView colors={
				[
					{name: "Pinkish Red", code: 'e76f51'},
					{name: "Light Yellow", code: 'f4a261'},
					{name: "Yellow", code: 'e9c46a'},
					{name: "Water Blue", code: '2a9d8f'},
					{name: "Dark Gray", code: '264653'}
				]
			} sizes={
				['XXS','XS','S', 'M', 'L', 'XL', 'XXL' ]
			}/>
		
		</div>
	);
};

export default WishList;