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
                <table className="table  table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"><button type="button" className="btn btn-primary">Add Category</button></th>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getCategories.map((category,index) => (
                            <tr>
                                <td>{index+1}</td>
                                <td>{<img className="img-thumbnail" src={`./images/categories/${category.images[0]}`} width="100" height="80" alt="category"/>}</td>
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
