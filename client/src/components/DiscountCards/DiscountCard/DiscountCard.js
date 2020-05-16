import React, { useState, useCallback, useMemo } from 'react'
import axios from 'axios';

const DiscountCard = (data) => {

    console.log("data table: ", data.data);
    console.log("data update: ", data.data.data);
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [addDiscount, setAddDiscount] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [updateInfoDiscount,setUpdateInfoDiscount] = useState('');
    const [updateInfoFromDate,setUpdateInfoFromDate] = useState('');
    const [updateInfoToDay,setUpdateInfoToDay] = useState('');

    const storeInformation = useCallback((name, id) => {
        setTitle(name);
        setId(id);
    }, []);
    
    const updateInformation = () => {

    }

    const deleteInformation = () => {

    }

    const submitDiscountFormData = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token') //temp - change to store manger token
        axios({
            method: 'patch',
            url: `http://localhost:8000/api/v1/products/${id}`,
            data: {
                discount: {
                    from: fromDate,
                    percentage: addDiscount,
                    until: toDate
                }
            },
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        window.location.reload()

        setAddDiscount(" ");
        setFromDate(" ");
        setToDate(" ");
    }

    return (
        <div className="container">

            {/* Modal-discount insert */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="form-group">
                                    <label>Discount</label>
                                    <input type="text" className="form-control" id="inputDiscount" placeholder="Discount"
                                        aria-describedby="discountHelp"
                                        autoComplete="off"
                                        value={addDiscount}
                                        onChange={e => setAddDiscount(e.target.value)} />
                                    <small id="discountHelp" className="form-text text-muted">Enter discount value for the product.</small>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="date" className="form-control"
                                            aria-describedby="fromHelp"
                                            value={fromDate}
                                            onChange={e => setFromDate(e.target.value)} />
                                        <small id="fromHelp" className="form-text text-muted">Discount valid from</small>
                                    </div>
                                    <div className="col">
                                        <input type="date" className="form-control"
                                            aria-describedby="untilHelp"
                                            value={toDate}
                                            onChange={e => setToDate(e.target.value)} />
                                        <small id="untilHelp" className="form-text text-muted">To</small>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={(e) => submitDiscountFormData(e)} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal ends*/}

            {/* update modal */}
            <div className="modal fade" id="updateDiscountModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="form-group">
                                    <label>Discount</label>
                                    <input type="text" className="form-control" id="inputDiscount" placeholder="From"
                                        aria-describedby="discountHelp"
                                        autoComplete="off"
                                        value={addDiscount}
                                        onChange={e => setAddDiscount(e.target.value)} />
                                    <small id="discountHelp" className="form-text text-muted">Enter discount value for the product.</small>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="date" className="form-control"
                                            aria-describedby="fromHelp"
                                            value={fromDate}
                                            onChange={e => setFromDate(e.target.value)} />
                                        <small id="fromHelp" className="form-text text-muted">Discount valid from</small>
                                    </div>
                                    <div className="col">
                                        <input type="date" className="form-control"
                                            aria-describedby="untilHelp"
                                            value={toDate}
                                            onChange={e => setToDate(e.target.value)} />
                                        <small id="untilHelp" className="form-text text-muted">To</small>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={(e) => submitDiscountFormData(e)} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* update modal ends */}

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

                                <tr key={data._id}>
                                    <td><img src={`./../../../../public/images/products/${data.images[0]}`} width="60" height="60" alt="products" /></td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>{data.description}</td>
                                    <td>{data.discount.percentage + '%'}</td>
                                    <td>{
                                        <div className="form-row">

                                            <button type="button" size="sm" onClick={() => { storeInformation(data.name, data._id) }} data-toggle="modal" data-target="#exampleModal" className="btn btn-outline-secondary">Add&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>

                                            <button type="button" size="sm" onClick={() => { updateInformation(data._id,data.discount.percentage,data.discount.from,data.discount.until)}} data-toggle="modal" data-target="#updateDiscountModal" className="btn btn-outline-warning mt-1">Update</button>

                                            <button type="button" size="sm"  onClick={() => { deleteInformation(data._id)}} data-toggle="modal" data-target=""  className="btn btn-outline-danger mt-1">Delete&nbsp;&nbsp;</button>

                                        </div>
                                    }</td>
                                </tr>
                            )}


                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default DiscountCard
