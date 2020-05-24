import React from 'react';
import SMCategory from './SMCategory/SMCategory';
const Swal = require('sweetalert2');

const SMCategories = (props) => {
	return (
		<table className='table'>
			<thead>
				<tr>
					<th scope='col'>Image</th>
					<th scope='col'>Title</th>
					<th scope='col'>Description</th>
					<th scope='col'>Action</th>
				</tr>
			</thead>
			<tbody>
				{props.categories.map((category) => (
					<SMCategory
						category={category}
						key={category._id}
						updateComponent={props.updateComponent}
					></SMCategory>
				))}
			</tbody>
		</table>
	);
};

export default SMCategories;
