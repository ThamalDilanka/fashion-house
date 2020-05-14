import React, { useState, useEffect } from 'react';

const RatingModule = (props) => {
	const [firstColor, setFirstColor] = useState('gray');
	const [secondColor, setSecondColor] = useState('gray');
	const [thirdColor, setThirdColor] = useState('gray');
	const [fourthColor, setForthColor] = useState('gray');
	const [fifthColor, setFifthColor] = useState('gray');

	useEffect(() => {
		const rating = props.rating;

		if (rating > 0) {
			setFirstColor('orange');
		}
		if (rating > 1) {
			setSecondColor('orange');
		}
		if (rating > 2) {
			setThirdColor('orange');
		}
		if (rating > 3) {
			setForthColor('orange');
		}
		if (rating > 4) {
			setFifthColor('orange');
		}
	}, []);

	return (
		<div>
			<span
				className='fa fa-star checked'
				style={{ color: firstColor }}
			></span>
			<span
				className='fa fa-star checked'
				style={{ color: secondColor }}
			></span>
			<span
				className='fa fa-star checked'
				style={{ color: thirdColor }}
			></span>
			<span
				className='fa fa-star checked'
				style={{ color: fourthColor }}
			></span>
			<span
				className='fa fa-star checked'
				style={{ color: fifthColor }}
			></span>
		</div>
	);
};

export default RatingModule;
