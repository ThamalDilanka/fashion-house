import React, { useState, useEffect } from 'react';
import { store } from 'react-notifications-component';
import Session from '../../util/Session';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import randomString from 'randomstring';
import validator from 'validator';
import SMCategories from '../SMCategories/SMCategories';
import { storage } from '../../firebase/config';

const CategoriesPanel = (props) => {
	const [isAddingFormOpen, setIsAddingFormOpen] = useState(false);
	const [categories, setCategories] = useState([]);
	const [updated, setUpdated] = useState(1);

	const [image, setImage] = useState(null);
	const [imageName, setImageName] = useState('select an image');
	const [imageURL, setImageURL] = useState('');
	const [progress, setProgress] = useState(0);

	const [categoryTitle, setCategoryTitle] = useState('');
	const [categoryDescription, setCategoryDescription] = useState('');

	const [categoryTitleIsValid, setCategoryTitleIsValid] = useState(true);
	const [
		categoryDescriptionIsValid,
		setCategoryDescriptionIsValid,
	] = useState(true);

	const [isModified, setIsModified] = useState(false);

	const onCategoryTitleChange = (e) => {
		setCategoryTitle(e.target.value);
		setIsModified(true);
	};

	const onCategoryDescriptionChange = (e) => {
		setCategoryDescription(e.target.value);
		setIsModified(true);
	};

	const onCategoryTitleLeave = (e) => {
		if (validator.isEmpty(e.target.value)) setCategoryTitleIsValid(false);
		else setCategoryTitleIsValid(true);
	};

	const onCategoryDescriptionLeave = (e) => {
		if (validator.isEmpty(e.target.value))
			setCategoryDescriptionIsValid(false);
		else setCategoryDescriptionIsValid(true);
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
						console.log(url);
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

	const updateComponent = () => {
		setUpdated(updated + 1);
		console.log('updated');
	};

	const addCategory = () => {
		if (
			!(categoryTitleIsValid && categoryDescriptionIsValid && isModified)
		) {
			return;
		}
		axios
			.post(
				'http://localhost:8000/api/v1/categories',
				{
					title: categoryTitle,
					description: categoryDescription,
					images: imageURL,
				},
				{
					headers: {
						Authorization: `Bearer ${Session.getToken()}`,
					},
				}
			)
			.then((res) => {
				updateComponent();
				// Show a notification
				store.addNotification({
					title: `${res.data.data.category.title} Successfully added`,
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
				console.log(err.response.data);
			});
	};

	const onCancel = () => {
		setIsAddingFormOpen(false);
		setCategoryTitle('');
		setCategoryDescription('');
	};

	useEffect(() => {
		axios
			.get('http://localhost:8000/api/v1/categories')
			.then((res) => {
				setCategories([...res.data.data.categories]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [updated]);

	return (
		<React.Fragment>
			<div className='backend container'>
				<div className='d-flex bd-highlight'>
					<div className='flex-fill bd-highlight'>
						<h3 className='no-margin'>Categories</h3>
					</div>
					<div className='flex-fill bd-highlight'>
						<button
							className='add-new-btn float-right'
							onClick={() => {
								setIsAddingFormOpen(true);
							}}
						>
							<i className='fa fa-plus'></i> Add New
						</button>
					</div>
				</div>
				{isAddingFormOpen ? <hr /> : null}
				<Collapsible open={isAddingFormOpen}>
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
								Click on the bellow bar to choose a photo from
								you device
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
								<label>Category Title</label>
								<input
									type='text'
									className={
										categoryTitleIsValid
											? 'form-control'
											: 'form-control is-invalid'
									}
									value={categoryTitle}
									placeholder='Add a title for your new product category'
									onChange={onCategoryTitleChange}
									onBlur={onCategoryTitleLeave}
								/>
								<div className='invalid-feedback'>
									Please enter the category title
								</div>
							</div>
						</div>
						<div className='form-row'>
							<div className='col-md mb-3'>
								<label>Category Description</label>
								<textarea
									className={
										categoryDescriptionIsValid
											? 'form-control'
											: 'form-control is-invalid'
									}
									value={categoryDescription}
									placeholder='Add a brief description about your category'
									onChange={onCategoryDescriptionChange}
									onBlur={onCategoryDescriptionLeave}
								></textarea>
								<div className='invalid-feedback'>
									Please enter a description to the category.
								</div>
							</div>
						</div>
						<button
							className='btn btn-primary float-right'
							onClick={addCategory}
						>
							Add Category
						</button>
						<button
							className='sm-cancel-btn btn btn-secondary float-right'
							onClick={onCancel}
						>
							Cancel
						</button>
					</div>
				</Collapsible>

				<br />
				{isAddingFormOpen ? <h5>Registered Categories</h5> : null}
				<SMCategories
					categories={categories}
					updateComponent={updateComponent}
				></SMCategories>
			</div>
		</React.Fragment>
	);
};

export default CategoriesPanel;
