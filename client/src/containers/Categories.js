import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Categories = () => {

    const [getCategories, setGetCategories] = useState([]);

    useEffect(() => { //retrieve categories on pg load
        const fetchData = async () => {
            const resp = await axios.get('http://localhost:8000/api/v1/categories');
            setGetCategories([...resp.data.data.categories]);
            // console.log(resp.data.data.categories);
        }
        fetchData();
    }, []);
    { console.log("test: ", getCategories) }

    return (

        <div className="mt-5">
            <div className="container">

                {/* modal */}
                <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal ends */}


                <table className="table  table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"><button data-toggle="modal" data-target="#staticBackdrop" type="button" className="btn btn-primary">Add Category</button></th>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getCategories.map((category, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{<img className="img-thumbnail" src={`./images/categories/${category.images[0]}`} width="100" height="80" alt="category" />}</td>
                                <td>{category.title}</td>
                                <td>{category.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Categories
