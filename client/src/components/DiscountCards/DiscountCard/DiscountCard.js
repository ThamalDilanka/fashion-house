import React, { useState, useCallback } from 'react'
import axios from 'axios';

const DiscountCard = (data) => {
    
    const [title, setTitle] = useState('');
    const [id, setId] = useState(null);
    const [addDiscount, setAddDiscount] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [updateInfoDiscount,setUpdateInfoDiscount] = useState('');
    const [updateInfoFromDate,setUpdateInfoFromDate] = useState('');
    const [updateInfoToDay,setUpdateInfoToDay] = useState('');
    const [updateInfoId,setUpdateInfoId] = useState(null);
    const [updateInfoTitle,setUpdateInfoTitle] = useState('');
    const [deleteDiscount,setDeleteDiscount] = useState('');
    const [deleteId,setDeleteId] = useState(null);
    const [deleteFromDate,setDeleteFromDate] = useState('');
    const [delteToDate,setDeleteToDate] = useState('');
    const [deleteName,setDeleteName] = useState('');
    const [updateNewDiscount,setUpdateNewDiscount] = useState('');
    const [updateFromDate,setUpdateFronmDate] = useState('');
    const [updateUntil,setUpdateUntil] = useState('');

    const storeInformation = useCallback((name, id) => {
        setTitle(name);
        setId(id);
    }, []);
    
    const updateInformation =  useCallback((id,discount,from,until,title) => {
        console.log("update data info: ",discount,until);
        setUpdateInfoDiscount(discount);
        setUpdateInfoFromDate(from);
        setUpdateInfoToDay(until);
        setUpdateInfoId(id);
        setUpdateInfoTitle(title);
    },[]);

    const deleteInformation = useCallback((id,discount,from,until,name) => {
        setDeleteDiscount(discount);
        setDeleteId(id);
        setDeleteFromDate(from);
        setDeleteToDate(until);
        setDeleteName(name);
    },[]);

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

    const updateDiscountModalData = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios({
            method: 'patch',
            url: `http://localhost:8000/api/v1/products/${updateInfoId}`,
            data: {
                discount: {
                    from: updateFromDate,
                    percentage:updateNewDiscount,
                    until: updateUntil
                }
            },
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        window.location.reload();

        
        setAddDiscount(" ");
        setFromDate(" ");
        setToDate(" ");
    }

    const deleteItemDiscount = (e) =>{
        e.preventDefault();
        const token = localStorage.getItem('token')
        axios({
            method: 'patch',
            url: `http://localhost:8000/api/v1/products/${deleteId}`,
            data: {
                discount: {
                    from:  undefined,
                    percentage:  undefined,
                    until: undefined
                }
            },
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        window.location.reload();
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
                            <h5 className="modal-title" id="exampleModalLabel">{updateInfoTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <form className="was-validated">
                                <div className="form-group">
                                    <label>Discount</label>
                                    <input type="text" className="form-control" id="inputDiscountUpdate"
                                        aria-describedby="discountHelp"
                                        autoComplete="off"
                                       placeholder={updateInfoDiscount}  
                                        //value={updateInfoDiscount}  
                                        required                                 
                                        onChange={e => setUpdateNewDiscount(e.target.value)} />
                                    <small id="discountHelp" className="form-text text-muted">Enter discount value for the product.</small>
                                    <div className="invalid-feedback">
                                     Please provide a value for discount.
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control"
                                            id="updateDiscountFromD"
                                            aria-describedby="fromHelp"
                                            //value={updateInfoFromDate}
                                            placeholder={updateInfoFromDate}
                                            onFocus={(e) => e.target.type = 'date'}
                                            onBlur={(e) => e.target.type = 'text'}
                                            onChange={e => setUpdateFronmDate(e.target.value)}
                                            required />
                                        <small id="fromHelp" className="form-text text-muted">Discount valid from</small>
                                        <div className="invalid-feedback">
                                                 Please select a starting date.
                                             </div>
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control"
                                            aria-describedby="untilHelp"
                                            id="updateUntilD"
                                            placeholder={updateInfoToDay}
                                            onFocus={(e) => e.target.type = 'date'}
                                            onBlur={(e) => e.target.type = 'text'}
                                            onChange={e => setUpdateUntil(e.target.value)} 
                                            required/>
                                        <small id="untilHelp" className="form-text text-muted">To</small>
                                        <div className="invalid-feedback">
                                                 Please select a end date.
                                             </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" onClick={(e) =>  updateDiscountModalData(e)} className="btn btn-warning">Update</button>
                        </div>
                            </form>

                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" onClick={(e) =>  updateDiscountModalData(e)} className="btn btn-warning">Update</button>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* update modal ends */}

             {/* Modal-discount delete*/}
             <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center text-danger" id="exampleModalLabel">Confirm Delete Request</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="row">
                                    <div className="col">
                                        <label>Discount:</label>
                                    </div>
                                    <div className="col">
                                        {deleteDiscount}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label>Valid From:</label>
                                    </div>
                                    <div className="col">
                                        {deleteFromDate}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label>Valid Until:</label>
                                    </div>
                                    <div className="col">
                                        {delteToDate}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label>Item:</label>
                                    </div>
                                    <div className="col">
                                        {deleteName}
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={(e) => deleteItemDiscount(e)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for delete ends*/}

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
                            data.data && data.data.map((data,index) =>

                                <tr key={data._id}>
                                    <td><img src={`./../../../../public/images/products/${data.images[0]}`} width="60" height="60" alt="products" /></td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>{data.description}</td>
                                    <td>{data.discount.percentage + '%'}</td>
                                    <td>{
                                        <div className="form-row">

                                            <button type="button" size="sm" onClick={() => { storeInformation(data.name, data._id) }} data-toggle="modal" data-target="#exampleModal" className="btn btn-outline-secondary">Add&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>

                                            <button type="button" size="sm" onClick={() => { updateInformation(data._id,data.discount.percentage,data.discount.from,data.discount.until,data.name)}} data-toggle="modal" data-target="#updateDiscountModal" className="btn btn-outline-warning mt-1">Update</button>

                                            <button type="button" size="sm"  onClick={() => { deleteInformation(data._id,data.discount.percentage,data.discount.from,data.discount.until,data.name)}} data-toggle="modal" data-target="#deleteModal"  className="btn btn-outline-danger mt-1">Delete&nbsp;&nbsp;</button>

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

export default DiscountCard;
