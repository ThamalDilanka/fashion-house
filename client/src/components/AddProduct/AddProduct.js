import React, { useState, useContext, useEffect } from 'react';
import { store } from 'react-notifications-component';
import { Link, Redirect } from 'react-router-dom';
import Session from '../../util/Session';
import { storage } from '../../firebase/config';
import axios from 'axios';
import Collapsible from 'react-collapsible';

// Assets
import './AddProduct.css';

const AddProduct = (props) => {
	const [image, setImage] = useState(null);
	const [imageName, setImageName] = useState('select an image');
	const [imageURL, setImageURL] = useState(null);
	const [error, setError] = useState('');
	const [progress, setProgress] = useState(0);

	const [categories, setCategories] = useState([]);

	const [productName, setProductName] = useState(
		'Add a descriptive name for your product'
	);
	const [productDescription, setProductDescription] = useState(
		'Add a brief description about your product'
	);

	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState(undefined);

	const [isXXSChecked, setIsXXSChecked] = useState(false);
	const [isXSChecked, setIsXSChecked] = useState(false);
	const [isSChecked, setIsSChecked] = useState(false);
	const [isMChecked, setIsMChecked] = useState(false);
	const [isLChecked, setIsLChecked] = useState(false);
	const [isXLChecked, setIsXLChecked] = useState(false);
	const [isXXLChecked, setIsXXLChecked] = useState(false);

	useEffect(() => {
		// Getting the categories from the API
		axios
			.get('http://localhost:8000/api/v1/categories')
			.then((res) => {
				console.log(res.data);
				setCategories([...res.data.data.categories]);
				setSelectedCategory(categories[0]._id);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const onXXSChange = (e) => {
		setIsXXSChecked(e.target.checked);
	};
	const onXSChange = (e) => {
		setIsXSChecked(e.target.checked);
	};
	const onSChange = (e) => {
		setIsSChecked(e.target.checked);
	};
	const onMChange = (e) => {
		setIsMChecked(e.target.checked);
	};
	const onLChange = (e) => {
		setIsLChecked(e.target.checked);
	};
	const onXLChange = (e) => {
		setIsXLChecked(e.target.checked);
	};
	const onXXLChange = (e) => {
		setIsXXLChecked(e.target.checked);
	};

	const onImageChange = (e) => {
		// Check for only image files
		if (e.target.files[0].type.startsWith('image/')) {
			setImage(e.target.files[0]);
			setImageName(e.target.files[0].name);
		} else {
			setError('Please upload a image file');
			setImage(null);
		}
	};

	const onImageUpload = () => {
		setProgress(5);
		const uploadTask = storage.ref(`images/${image.name}`).put(image);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				setProgress(
					Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					)
				);
			},
			(err) => {
				setError(err.message);
			},
			() => {
				storage
					.ref('images')
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						setImageURL(url);
						setProgress(0);
					});
			}
		);
	};

	// Handle image close event
	const onCloseUploadedImage = () => {
		setImage(null);
		setImageName('select an image');
		setImageURL(null);
	};

	// Handle the category change event
	const onCategoryChange = (e) => {
		const tempCategory = categories.find(
			(el) => el.title === e.target.value
		);
		setSelectedCategory(tempCategory._id);
	};

	// Handle the product name change
	const onProductNameChange = (e) => {
		setProductName(e.target.value);
	};

	// Handle the product description change
	const onProductDescriptionChange = (e) => {
		setProductDescription(e.target.value);
	};

	// Handle the product price change
	const onPriceChange = (e) => {
		if (e.target.value >= 0) {
			setPrice(e.target.value);
		}
	};

	// Handle the product quantity change
	const onQuantityChange = (e) => {
		if (e.target.value >= 0) {
			setQuantity(e.target.value);
		}
	};

	const onProductFormSubmit = async (e) => {
		e.preventDefault();

		const availableSizes = [];
		if (isXXSChecked) availableSizes.push('XXS');
		if (isXSChecked) availableSizes.push('XS');
		if (isSChecked) availableSizes.push('S');
		if (isMChecked) availableSizes.push('M');
		if (isLChecked) availableSizes.push('L');
		if (isXLChecked) availableSizes.push('XL');
		if (isXXLChecked) availableSizes.push('XXL');

		const newProduct = {
			name: productName,
			price: price,
			description: productDescription,
			quantity: quantity,
			category: selectedCategory,
			images: imageURL,
			sizes: availableSizes,
			colors: [
				{ name: 'CRIMSON', code: 'DC143C' },
				{ name: 'MEDIUMVIOLETRED', code: 'C71585' },
				{ name: 'TOMATO', code: 'FF6347' },
				{ name: 'SPRINGGREEN', code: '00FF7F' },
			],
		};

		axios
			.post('http://localhost:8000/api/v1/products/', newProduct, {
				headers: {
					Authorization: `Bearer ${Session.getToken()}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				// Show a notification
				store.addNotification({
					title: `${res.data.data.product.name} Successfully added`,
					message: 'Inserted product is now available in the store',
					type: 'success',
					insert: 'top-right',
					container: 'top-right',
					animationIn: ['animated', 'fadeIn'],
					animationOut: ['animated', 'fadeOut'],
					dismiss: {
						duration: 3000,
						showIcon: true,
					},
				});
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	return (
		<React.Fragment>
			<div className='container'>
				<h3>Add New Product</h3>
				<hr />
				<div className='product-add-image-container'>
					<img
						className={
							imageURL
								? 'product-add-uploaded-image'
								: 'product-add-uploaded-image hide-element'
						}
						src={imageURL}
						alt='product'
					/>
					<div
						className={
							imageURL
								? 'product-add-image-upload-form hide-element'
								: 'product-add-image-upload-form'
						}
					>
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
								accept='image/*'
								className='file-input-add-product custom-file-input'
								onChange={onImageChange}
							/>
							<label
								className='custom-file-label'
								htmlFor='customFile'
							>
								{imageName}
							</label>
						</div>
						<button
							disabled={!image}
							className='product-image-uploading-button'
							onClick={onImageUpload}
						>
							Upload
						</button>
						<br />

						{progress === 0 ? null : (
							<progress
								style={{ width: '100%' }}
								value={progress}
								max='100'
							></progress>
						)}
					</div>
					<button
						className={
							imageURL
								? 'product-add-select-another-image-btn'
								: 'product-add-select-another-image-btn hide-element'
						}
						onClick={onCloseUploadedImage}
					>
						<i className='fa fa-times' aria-hidden='true'></i>
					</button>
				</div>
				<br />
				<form onSubmit={onProductFormSubmit}>
					<div className='form-row'>
						<div className='col-md mb-3'>
							<label>Product Name</label>
							<input
								type='text'
								className='form-control'
								placeholder={productName}
								onChange={onProductNameChange}
							/>
							<div className='invalid-feedback'>
								Please enter the product title
							</div>
						</div>
					</div>
					<div className='form-row'>
						<div className='col-md mb-3'>
							<label>Product Description</label>
							<textarea
								className='form-control'
								placeholder={productDescription}
								onChange={onProductDescriptionChange}
							></textarea>
							<div className='invalid-feedback'>
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
									className='form-control'
									value={price}
									onChange={onPriceChange}
								/>
								<div className='invalid-feedback'>
									Please choose a username.
								</div>
							</div>
						</div>
						<div className='col-md-4 mb-3'>
							<label>Quantity</label>
							<input
								type='number'
								className='form-control'
								value={quantity}
								onChange={onQuantityChange}
							/>
							<div className='invalid-feedback'>Looks good!</div>
						</div>
						<div className='col-md-4 mb-3'>
							<label>Category</label>
							<select
								className='custom-select'
								onChange={onCategoryChange}
							>
								<option>Select the category</option>
								{categories.map((category) => (
									<option key={category._id}>
										{category.title}
									</option>
								))}
							</select>
							<div className='invalid-feedback'>
								Please select a valid state.
							</div>
						</div>
					</div>

					<div className='form-row'>
						<div className='col-md-12 mb-3'>
							<label htmlFor='validationServer02'>
								Available Sizes
							</label>
							<br />

							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='size-xxs'
									checked={isXXSChecked}
									onChange={onXXSChange}
								/>
								<label
									className='custom-control-label'
									htmlFor='size-xxs'
								>
									XXS
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='size-xs'
									checked={isXSChecked}
									onChange={onXSChange}
								/>
								<label
									className='custom-control-label'
									htmlFor='size-xs'
								>
									XS
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='size-s'
									checked={isSChecked}
									onChange={onSChange}
								/>
								<label
									className='custom-control-label'
									htmlFor='size-s'
								>
									S
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='size-m'
									checked={isMChecked}
									onChange={onMChange}
								/>
								<label
									className='custom-control-label'
									htmlFor='size-m'
								>
									M
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='size-l'
									checked={isLChecked}
									onChange={onLChange}
								/>
								<label
									className='custom-control-label'
									htmlFor='size-l'
								>
									L
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='size-xl'
									checked={isXLChecked}
									onChange={onXLChange}
								/>
								<label
									className='custom-control-label'
									htmlFor='size-xl'
								>
									XL
								</label>
							</div>
							<div className='custom-control custom-checkbox custom-control-inline'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='size-xxl'
									checked={isXXLChecked}
									onChange={onXXLChange}
								/>
								<label
									className='custom-control-label'
									htmlFor='size-xxl'
								>
									XXL
								</label>
							</div>
						</div>
					</div>

					<Collapsible
						trigger={
							<div className='discount-collapse-header'>
								<p>Discount (Optional)</p>
								<i className='fa fa-angle-double-down'></i>
							</div>
						}
					>
						<div className='form-row'>
							<div className='col-md-4 mb-3'>
								<label htmlFor='validationServer01'>
									Discount
								</label>
								<input
									type='number'
									className='form-control is-valid'
								/>
								<div className='invalid-feedback'>
									Looks good!
								</div>
							</div>
							<div className='col-md-4 mb-3'>
								<label htmlFor='validationServer02'>From</label>
								<input
									type='date'
									className='form-control is-valid'
									id='validationServer02'
								/>
								<div className='invalid-feedback'>
									Looks good!
								</div>
							</div>
							<div className='col-md-4 mb-3'>
								<label htmlFor='validationServer02'>
									Until
								</label>
								<input
									type='date'
									className='form-control is-valid'
									id='validationServer02'
								/>
								<div className='invalid-feedback'>
									Looks good!
								</div>
							</div>
						</div>
					</Collapsible>

					<br />
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
