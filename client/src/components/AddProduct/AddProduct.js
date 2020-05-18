import React, { useState, useContext } from 'react';
import { store } from 'react-notifications-component';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

// Assets
import './AddProduct.css';

const AddProduct = (props) => {
	return (
		<React.Fragment>
			<div className='container'>
				<h3>Add New Product</h3>
				<hr />
				<form>
					<div class='form-row'>
						<div class='col-md mb-3'>
							<label>Product Title</label>
							<input
								type='text'
								class='form-control is-valid'
								required
							/>
							<div class='valid-feedback'>Looks good!</div>
						</div>
					</div>
					<div class='form-row'>
						<div class='col-md mb-3'>
							<label>Product Description</label>
							<textarea
								class='form-control is-valid'
								placeholder='Required example textarea'
								required
							></textarea>
							<div class='valid-feedback'>
								Please enter a message in the textarea.
							</div>
						</div>
					</div>

					<div class='form-row'>
						<div class='col-md-4 mb-3'>
							<label>Price</label>
							<div class='input-group'>
								<div class='input-group-prepend'>
									<span class='input-group-text'>Rs</span>
								</div>
								<input
									type='number'
									class='form-control is-valid'
									required
								/>
								<div class='valid-feedback'>
									Please choose a username.
								</div>
							</div>
						</div>
						<div class='col-md-4 mb-3'>
							<label>Quantity</label>
							<input
								type='number'
								class='form-control is-valid'
								required
							/>
							<div class='valid-feedback'>Looks good!</div>
						</div>
						<div class='col-md-4 mb-3'>
							<label>Category</label>
							<select class='custom-select is-valid' required>
								<option selected disabled value=''>
									Choose...
								</option>
								<option>...</option>
								<option>...</option>
								<option>...</option>
							</select>
							<div class='invalid-feedback'>
								Please select a valid state.
							</div>
						</div>
					</div>

					<div class='form-row'>
						<div class='col-md-4 mb-3'>
							<label for='validationServer01'>
								Discount (Optional)
							</label>
							<input
								type='number'
								class='form-control is-valid'
							/>
							<div class='valid-feedback'>Looks good!</div>
						</div>
						<div class='col-md-4 mb-3'>
							<label for='validationServer02'>From</label>
							<input
								type='date'
								class='form-control is-valid'
								id='validationServer02'
							/>
							<div class='valid-feedback'>Looks good!</div>
						</div>
						<div class='col-md-4 mb-3'>
							<label for='validationServer02'>Until</label>
							<input
								type='date'
								class='form-control is-valid'
								id='validationServer02'
							/>
							<div class='valid-feedback'>Looks good!</div>
						</div>
					</div>
					<div class='form-row'>
						<div class='col-md-6 mb-3'>
							<label for='validationServer02'>
								Available Sizes
							</label>
							<br />

							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck1'
								/>
								<label
									class='custom-control-label'
									for='customCheck1'
								>
									XXS
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck2'
								/>
								<label
									class='custom-control-label'
									for='customCheck2'
								>
									XS
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck3'
								/>
								<label
									class='custom-control-label'
									for='customCheck3'
								>
									S
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck4'
								/>
								<label
									class='custom-control-label'
									for='customCheck4'
								>
									M
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck6'
								/>
								<label
									class='custom-control-label'
									for='customCheck6'
								>
									L
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck7'
								/>
								<label
									class='custom-control-label'
									for='customCheck7'
								>
									XL
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck8'
								/>
								<label
									class='custom-control-label'
									for='customCheck8'
								>
									XXL
								</label>
							</div>
						</div>
						<div class='col-md-6 mb-3'>
							<label for='validationServer02'>
								Available Sizes
							</label>
							<br />

							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck1'
								/>
								<label
									class='custom-control-label'
									for='customCheck1'
								>
									XXS
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck2'
								/>
								<label
									class='custom-control-label'
									for='customCheck2'
								>
									XS
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck3'
								/>
								<label
									class='custom-control-label'
									for='customCheck3'
								>
									S
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck4'
								/>
								<label
									class='custom-control-label'
									for='customCheck4'
								>
									M
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck6'
								/>
								<label
									class='custom-control-label'
									for='customCheck6'
								>
									L
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck7'
								/>
								<label
									class='custom-control-label'
									for='customCheck7'
								>
									XL
								</label>
							</div>
							<div class='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customCheck8'
								/>
								<label
									class='custom-control-label'
									for='customCheck8'
								>
									XXL
								</label>
							</div>
						</div>
					</div>
					<div class='form-row'>
						<div class='col-md-12 mb-3'>
							<label for='validationServer01'>
								Select an image
							</label>
							<div class='custom-file'>
								<input
									type='file'
									class='custom-file-input'
									id='customFile'
								/>
								<label
									class='custom-file-label'
									for='customFile'
								>
									Choose file
								</label>
							</div>
							<div class='valid-feedback'>Looks good!</div>
						</div>
					</div><br/>
					<button class='btn btn-primary float-right' type='submit'>
						Add Product
					</button><br/><br/>
				</form><br/><br/>
			</div>
		</React.Fragment>
	);
};

export default AddProduct;
