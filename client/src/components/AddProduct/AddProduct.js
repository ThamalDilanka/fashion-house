import React, { useState, useContext } from 'react';
import { store } from 'react-notifications-component';
import { Link, Redirect } from 'react-router-dom';
import Session from '../../util/Session';
import axios from 'axios';

// Assets
import './AddProduct.css';

const AddProduct = (props) => {
	const [file, setFile] = useState('');
	const [fileName, setFileName] = useState(
		'Upload an eye catching image of your product'
	);
	const [filePath, setFilePath] = useState('');
	const [uploadedFile, setUploadedFile] = useState({});

	const onImageChange = (e) => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};

	const onImageUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('images', file);
		formData.append('reqtype', 'product');

		try {
			const res = await axios.post(
				'http://localhost:8000/api/v1/products/images',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${Session.getToken()}`,
					},
				}
			);

			const { fileName, filePath } = res.data.data;
			setUploadedFile({ fileName, filePath });
		} catch (err) {
			console.log(err.response);
		}
	};

	const onProductFormSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<React.Fragment>
			<div className='container'>
				<h3>Add New Product</h3>
				<hr />
				<div
					className='product-add-image-container'
					onChange={onImageUpload}
				>
					<img
						className='product-add-uploaded-image hide-element'
						src=''
						alt=''
					/>
					<form className='product-add-image-upload-form'>
						<i
							className='product-image-icon fa fa-file-image-o'
							aria-hidden='true'
						></i>
						<p className='product-image-uploading-message'>
							Click on the bellow bar to choose a photo from you
							device
						</p>
						<div className='product-add-file-input custom-file'>
							<input
								type='file'
								className='custom-file-input'
								onChange={onImageChange}
							/>
							<label
								className='custom-file-label'
								htmlFor='customFile'
							>
								{fileName}
							</label>
						</div>
						<button className='product-image-uploading-button'>
							Upload
						</button>
					</form>
				</div>
				<br />
				<form onSubmit={onProductFormSubmit}>
					<div className='form-row'>
						<div className='col-md mb-3'>
							<label>Product Name</label>
							<input
								type='text'
								className='form-control'
								required
							/>
							<div className='valid-feedback'>Looks good!</div>
						</div>
					</div>
					<div className='form-row'>
						<div className='col-md mb-3'>
							<label>Product Description</label>
							<textarea
								className='form-control is-valid'
								placeholder='Required example textarea'
								required
							></textarea>
							<div className='valid-feedback'>
								Please enter a message in the textarea.
							</div>
						</div>
					</div>

					<div className='form-row'>
						<div className='col-md-4 mb-3'>
							<label>Price</label>
							<div className='input-group'>
								<div className='input-group-prepend'>
									<span className='input-group-text'>Rs</span>
								</div>
								<input
									type='number'
									className='form-control is-valid'
									required
								/>
								<div className='valid-feedback'>
									Please choose a username.
								</div>
							</div>
						</div>
						<div className='col-md-4 mb-3'>
							<label>Quantity</label>
							<input
								type='number'
								className='form-control is-valid'
								required
							/>
							<div className='valid-feedback'>Looks good!</div>
						</div>
						<div className='col-md-4 mb-3'>
							<label>Category</label>
							<select className='custom-select is-valid' required>
								<option>...</option>
								<option>...</option>
								<option>...</option>
							</select>
							<div className='invalid-feedback'>
								Please select a valid state.
							</div>
						</div>
					</div>

					<div className='form-row'>
						<div className='col-md-4 mb-3'>
							<label htmlFor='validationServer01'>
								Discount (Optional)
							</label>
							<input
								type='number'
								className='form-control is-valid'
							/>
							<div className='valid-feedback'>Looks good!</div>
						</div>
						<div className='col-md-4 mb-3'>
							<label htmlFor='validationServer02'>From</label>
							<input
								type='date'
								className='form-control is-valid'
								id='validationServer02'
							/>
							<div className='valid-feedback'>Looks good!</div>
						</div>
						<div className='col-md-4 mb-3'>
							<label htmlFor='validationServer02'>Until</label>
							<input
								type='date'
								className='form-control is-valid'
								id='validationServer02'
							/>
							<div className='valid-feedback'>Looks good!</div>
						</div>
					</div>
					<div className='form-row'>
						<div className='col-md-6 mb-3'>
							<label htmlFor='validationServer02'>
								Available Sizes
							</label>
							<br />

							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck1'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck1'
								>
									XXS
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck2'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck2'
								>
									XS
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck3'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck3'
								>
									S
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck4'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck4'
								>
									M
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck6'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck6'
								>
									L
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck7'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck7'
								>
									XL
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck8'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck8'
								>
									XXL
								</label>
							</div>
						</div>
						<div className='col-md-6 mb-3'>
							<label htmlFor='validationServer02'>
								Available Sizes
							</label>
							<br />

							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck1'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck1'
								>
									XXS
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck2'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck2'
								>
									XS
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck3'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck3'
								>
									S
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck4'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck4'
								>
									M
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck6'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck6'
								>
									L
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck7'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck7'
								>
									XL
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck8'
								/>
								<label
									className='custom-control-label'
									htmlFor='customCheck8'
								>
									XXL
								</label>
							</div>
						</div>
					</div>

					<button
						className='btn btn-primary float-right'
						type='submit'
					>
						Add Product
					</button>
					<br />
					<br />
				</form>
				<br />
				<br />
			</div>
		</React.Fragment>
	);
};

export default AddProduct;
