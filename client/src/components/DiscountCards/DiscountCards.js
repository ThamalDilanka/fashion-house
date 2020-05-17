import React from 'react'
import DiscountCard from './DiscountCard/DiscountCard';

const DiscountCards = (data) => {
    return (
        <div>
            {
                <DiscountCard data={data.data} key={data._id}/>
            }
        </div>
    )
}

export default DiscountCards
