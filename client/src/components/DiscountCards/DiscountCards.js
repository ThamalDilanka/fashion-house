import React from 'react'
import DiscountCard from './DiscountCard/DiscountCard';

const DiscountCards = (data) => {
    return (
        <div>
            {	<div className='backend container'>
				<h3>Discount Details of Items</h3>
                <small className="text-muted"> update discout details</small>
				<br />
                <DiscountCard data={data.data} key={data._id}/>
                </div>
            }
        </div>
    )
}

export default DiscountCards