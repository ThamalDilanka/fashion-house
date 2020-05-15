import React from 'react'


const DiscountCard = (data) => {
    console.log("data card: ", data.data)
    return (
        <div className="container">

            <div className="mt-5">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             data.data && data.data.map(data =>
                                <tr>
                                    {/* <th scope="row">1</th> */}
                                    <td><img src={`./../../../../public/images/products/${data.images[0]}`} alt="category"/></td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>{data.description}</td>
                                    <td>{data.discount.percentage+'%'}</td>
                                    <td>{<button type="button" class="btn btn-outline-secondary">Add Discount</button>}</td>
                                </tr>
                            )}


                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default DiscountCard
