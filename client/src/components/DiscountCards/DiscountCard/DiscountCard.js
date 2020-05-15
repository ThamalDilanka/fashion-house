import React from 'react'


const DiscountCard = (data) => {
    console.log("data card: ", data.data)
    return (
        <div className="container">

            {/* Modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">model discount</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Test
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal ends*/}

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
                                    <td><img src={`./../../../../public/images/products/${data.images[0]}`} alt="category" /></td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>{data.description}</td>
                                    <td>{data.discount.percentage + '%'}</td>
                                    <td>{<button type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-outline-secondary">Add Discount</button>}</td>
                                </tr>
                            )}


                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default DiscountCard
