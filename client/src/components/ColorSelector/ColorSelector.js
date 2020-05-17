import React, { useState } from 'react';
import './ColorSelector.css';
import uuid from "uuid";

const ColorSelector = (props) => {
	const [selectedColor, setSelectedColor] = useState('select a color');
    const [selectedColorCode, setSelectedColorCode] = useState('ccc');

	return (
		<div
			className='product-view-color-selector-container'
			style={{ border: `solid 1px #${selectedColorCode}` }}
		>
			<label className='product-view-selected-color'>
				{selectedColor}
			</label>
			{props.colors.map((color) => (
				<button
					className='product-view-color-selector'
					key={uuid()}
                    style={{ backgroundColor: `#${color.code}` }}
                    name={color.code}
                    onClick={
                        () => {
                            setSelectedColor(`${color.name}`);
                            setSelectedColorCode(`${color.code}`);
                        }
                    }
				></button>
			))}
		</div>
	);
};

export default ColorSelector;
