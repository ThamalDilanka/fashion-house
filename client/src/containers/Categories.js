import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Categories = () => {

    const [getCategories, setGetCategories] = useState([]);
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [image,setImage] = useState(null);

    useEffect(() => { //retrieve categories on pg load
        const fetchData = async () => {
            const resp = await axios.get('http://localhost:8000/api/v1/categories');
            setGetCategories([...resp.data.data.categories]);//ufjhv
            console.log("gfdjhd");
             console.log("resp: ",resp.data.data.categories);
        }
        fetchData();
    }, []);
    { console.log("test: ", getCategories) }

    const addNewCategory = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token') //temp - change  token
        axios({
            method: 'post',
            url: `http://localhost:8000/api/v1/products`,
            data: {
                title: title ,
                description: description,
                image:image
            },
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
     window.location.reload()
    }



    return (
        <div className="mt-5">
            <div className="container">

                {/* modal */}
                <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Add a New Category To The Store</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <form>
                                    <div className="form-group">
                                        <label>Add Title</label>
                                        <input type="text" className="form-control" id="exampleInputTitle"
                                        autoComplete="off"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}/>
                                        <small id="emailHelp" className="form-text text-muted">Give a name to new Category</small>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type="text" className="form-control" id="exampleInputDescription" 
                                        autoComplete="off"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Choose an image</label>
                                        <input type="file" className="form-control" id="exampleInputPic" 
                                         onChange={e => setImage( e.target.files)}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={(e) => {addNewCategory(e)}}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal ends */}

                <table className="table  table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"><button  data-toggle="modal" data-target="#staticBackdrop"  type="button" className="btn btn-primary">Add Category</button></th>
                            <th scope="col">Image url</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getCategories.map((category, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{<img className="img-thumbnail" src={category.images[0]} width="100" height="80" alt="category" />}</td>
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
