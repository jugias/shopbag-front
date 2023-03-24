import React from "react";

import "./createProduct.css";

export const Input = ({
	label,
	placeholder,
	msgError,
	type,
	size,
	state,
	setstate,
	validRegex,
}) => {
	const handleInputChange = async ({ target }) => {
		setstate({
			...state,
			value: target.value,
		});
	};
	const handleValidate = () => {
		if (validRegex) {
			if (validRegex.test(state.value)) {
				setstate({
					...state,
					valid: true,
				});
			} else {
				setstate({
					...state,
					valid: false,
				});
			}
		}
	};
	return (
		<div className={size}>
			<label>{label}</label>
			<div className="create__grupoInput ">
				<input
					id={state.id}
					className={`create__input ${
						state.valid === null
							? null
							: state.valid === true
							? "valid"
							: "invalid"
					}`}
					type={type}
					placeholder={placeholder}
					value={state.value}
					onChange={handleInputChange}
					onKeyUp={handleValidate}
					onBlur={handleValidate}
				/>
				<i
					className={`create__iconInput fas  ${
						state.valid === null
							? null
							: state.valid
							? "validIcon fa-check-circle"
							: "invalidIcon fa-times-circle"
					}`}
				></i>
			</div>
			{state.valid === false && (
				<p className="create__invalid">{msgError}</p>
			)}
		</div>
	);
};
