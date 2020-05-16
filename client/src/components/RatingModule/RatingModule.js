import React, { useState, useEffect } from 'react';

const RatingModule = (props) => {
	const [firstColor, setFirstColor] = useState('gray');
	const [secondColor, setSecondColor] = useState('gray');
	const [thirdColor, setThirdColor] = useState('gray');
	const [fourthColor, setForthColor] = useState('gray');
	const [fifthColor, setFifthColor] = useState('gray');

	useEffect(() => {
		if (props.rating > 0.5) {
			setFirstColor('orange');
		}
		if (props.rating > 1.5) {
			setSecondColor('orange');
		}
		if (props.rating > 2.5) {
			setThirdColor('orange');
		}
		if (props.rating > 3.5) {
			setForthColor('orange');
		}
		if (props.rating > 4.5) {
			setFifthColor('orange');
		}
	}, [props.rating]);

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
