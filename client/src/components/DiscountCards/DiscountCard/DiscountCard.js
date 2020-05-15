import React, { useState, useCallback } from 'react'

const DiscountCard = (data) => {

    console.log("data card: ", data.data)
    const [title, setTitle] = useState('');

    const storeInformation = useCallback((name, id) => {
        console.log("fn called with: ", name, id);
        setTitle(name);
    }, []);

    return (
        <div className="container">

            {/* Modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <form>
                                <div class="form-group">
                                    <label for="inputDiscount">Discount</label>
                                    <input type="text" class="form-control" id="inputDiscount" placeholder="From" aria-describedby="discountHelp"/>
                                    <small id="discountHelp" class="form-text text-muted">Enter discount value for the product.</small>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <input type="date" class="form-control"  aria-describedby="fromHelp"/>
                                        <small id="fromHelp" class="form-text text-muted">Discount valid from</small>
                                    </div>
                                    <div class="col">
                                        <input type="date" class="form-control"  aria-describedby="untilHelp"/>
                                        <small id="untilHelp" class="form-text text-muted">Until</small>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Submit</button>
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
                                    <td><img src={`./../../../../public/images/products/${data.images[0]}`} width="60" height="60" alt="products" /></td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>{data.description}</td>
                                    <td>{data.discount.percentage + '%'}</td>
                                    <td>{<button type="button" onClick={() => { storeInformation(data.name, data._id) }} data-toggle="modal" data-target="#exampleModal" class="btn btn-outline-secondary">Add Discount</button>}</td>
                                </tr>
                            )}


                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default DiscountCard
