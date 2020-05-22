import React from 'react';
import StoreManagerItem from './StoreManagerItems/StoreManagerItem';

const StoreManagerItems = (props) => {
	return (
		<table className='table'>
			<thead >
				<tr>
					<th scope='col'>Image</th>
					<th scope='col'>Name</th>
					<th scope='col'>Email</th>
					<th scope='col'>Action</th>
				</tr>
			</thead>
			<tbody>
				{props.storeManagers.map((storeManager) => (
					<StoreManagerItem
                        storeManager={storeManager}
                        key={storeManager._id}
					></StoreManagerItem>
				))}
			</tbody>
		</table>
	);
};

export default StoreManagerItems;
