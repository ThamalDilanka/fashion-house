import React, { useState, useContext, useEffect } from 'react';
import { store } from 'react-notifications-component';
import { Link, Redirect } from 'react-router-dom';
import Session from '../../util/Session';
import { storage } from '../../firebase/config';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import { SwatchesPicker } from 'react-color';
import validator from 'validator';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

// Assets
import './AddProduct.css';

const AddProduct = (props) => {
	const [image, setImage] = useState(null);
	const [imageName, setImageName] = useState('select an image');
	const [imageURL, setImageURL] = useState(null);
	const [progress, setProgress] = useState(0);

	const [categories, setCategories] = useState([]);

	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');

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

	const [selectedColor, setSelectedColor] = useState('');
	const [selectedColorName, setSelectedColorName] = useState('');

	const [availableColors, setAvailableColors] = useState([]);

	const [discount, setDiscount] = useState(0);
	const [discountFrom, setDiscountFrom] = useState('');
	const [discountUntil, setDiscountUntil] = useState('');

	const onDiscountChange = (e) => {
		setDiscount(e.target.value);
	};

	const onDiscountFromChange = (e) => {
		setDiscountFrom(e.target.value);
	};

	const onDiscountUntilChange = (e) => {
		setDiscountUntil(e.target.value);
	};

	useEffect(() => {
		// Getting the categories from the API
		axios
			.get('http://localhost:8000/api/v1/categories')
			.then((res) => {
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
				console.log(err);
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

	const onSelectColor = (color, e) => {
		setSelectedColor(color.hex.substring(1));
	};

	const onSelectedColorNameChange = (e) => {
		setSelectedColorName(e.target.value);
	};

	const onColorAdd = () => {
		if (!validator.isEmpty(selectedColorName)) {
			setAvailableColors([
				...availableColors,
				{ name: selectedColorName, code: selectedColor },
			]);
			setSelectedColor(undefined);
			setSelectedColorName('');
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

		let productDiscount = undefined;

		if (
			!(
				validator.isEmpty(`${discount}`) &&
				validator.isEmpty(discountFrom) &&
				validator.isEmpty(discountUntil)
			) &&
			discount != 0
		) {
			productDiscount = {
				percentage: parseInt(discount),
				from: moment(discountFrom).toDate(),
				until: moment(discountUntil).toDate(),
			};
		}

		const newProduct = {
			name: productName,
			price: price,
			description: productDescription,
			quantity: quantity,
			category: selectedCategory,
			images: imageURL,
			sizes: availableSizes,
			colors: [...availableColors],
			discount: productDiscount,
		};

		axios
			.post('http://localhost:8000/api/v1/products/', newProduct, {
				headers: {
					Authorization: `Bearer ${Session.getToken()}`,
				},
			})
			.then((res) => {
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

				setImage(null);
				setImageName('select an image');
				setImageURL(null);
				setProgress(0);
				setProductName('');
				setProductDescription('');
				setPrice(0);
				setQuantity(0);
				setSelectedCategory(undefined);
				setIsXXSChecked(false);
				setIsXSChecked(false);
				setIsSChecked(false);
				setIsMChecked(false);
				setIsXLChecked(false);
				setIsLChecked(false);
				setIsXXLChecked(false);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	return (
		<React.Fragment>
			<div className='backend container'>
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
				<div>
					<div className='form-row'>
						<div className='col-md mb-3'>
							<label>Product Name</label>
							<input
								type='text'
								className='form-control'
								value={productName}
								placeholder='Add a descriptive name for your product'
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
								value={productDescription}
								placeholder='Add a brief description about your product'
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
									value={price === 0 ? null : price}
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
								value={quantity === 0 ? null : quantity}
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

					<label htmlFor='validationServer02'>
						Add available colors
					</label>

					<div className='form-row'>
						<div className='col-lg mb-3'>
							<SwatchesPicker onChangeComplete={onSelectColor} />
						</div>
						<div className='col-lg-4 mb-3'>
							<label>Selected Color</label>
							<div className='input-group'>
								<div className='input-group-prepend'>
									<span className='input-group-text'>
										{selectedColor}
									</span>
								</div>
								<input
									disabled={true}
									className='form-control'
									style={{ background: `#${selectedColor}` }}
								/>
								<div className='invalid-feedback'>
									Please choose a username.
								</div>
							</div>
							<br />

							<label>Color Name</label>
							<input
								type='text'
								className='form-control'
								value={selectedColorName}
								onChange={onSelectedColorNameChange}
								placeholder='Enter a name for selected color'
							/>
							<div className='invalid-feedback'>Looks good!</div>
							<br />
							<button
								className='btn btn-primary float-right'
								onClick={onColorAdd}
							>
								Add Color
							</button>
						</div>
						<div className='col-lg-4 mb-3'>
							<label>Available Colors</label>
							{availableColors.map((el) => (
								<div
									key={uuid()}
									className='add-product-color-row d-flex'
								>
									<div
										className='add-product-color-circle'
										style={{ background: `#${el.code}` }}
									></div>

									<p>{el.name}</p>

									<button
										className=' float-right color-remove-button'
										onClick={() => {
											const ac = availableColors.filter(
												(e) => e.code != el.code
											);

											setAvailableColors([...ac]);
										}}
									>
										<i className='fa fa-close'></i>
									</button>
								</div>
							))}
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
								<label>Discount</label>
								<input
									type='number'
									className='form-control'
									value={discount}
									onChange={onDiscountChange}
								/>
								<div className='invalid-feedback'>
									please enter the discount percentage
								</div>
							</div>
							<div className='col-md-4 mb-3'>
								<label>From</label>
								<input
									type='date'
									className='form-control'
									value={discountFrom}
									onChange={onDiscountFromChange}
								/>
								<div className='invalid-feedback'>
									please enter the starting date
								</div>
							</div>
							<div className='col-md-4 mb-3'>
								<label>Until</label>
								<input
									type='date'
									className='form-control'
									value={discountUntil}
									onChange={onDiscountUntilChange}
								/>
								<div className='invalid-feedback'>
									please enter the end date
								</div>
							</div>
						</div>
					</Collapsible>

					<br />
					<button
						className='btn btn-primary float-right'
						onClick={onProductFormSubmit}
					>
						Add Product
					</button>
					<br />
					<br />
				</div>
				<br />
				<br />
			</div>
		</React.Fragment>
	);
};

export default AddProduct;
