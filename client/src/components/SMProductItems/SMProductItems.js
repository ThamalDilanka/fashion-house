import React from 'react';
import SMProductItem from './SMProductItem/SMProductItem';
const Swal = require('sweetalert2');

const SMProductItems = (props) => {
	return (
		<table className='table'>
			<thead>
				<tr>
					<th scope='col'>Image</th>
					<th scope='col'>Name</th>
					<th scope='col'>Price</th>
					<th scope='col'>Discount</th>
					<th scope='col'>Quantity</th>
					<th scope='col'>Action</th>
				</tr>
			</thead>
			<tbody>
				{props.products.map((product) => (
					<SMProductItem
						product={product}
                        key={product._id}
                        updateComponent={props.updateComponent}
					></SMProductItem>
				))}
			</tbody>
		</table>
	);
};

export default SMProductItems;
