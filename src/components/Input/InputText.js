import React from 'react'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'

const InputText = props => {
	const {
		label,
		placeholder,
		change,
		value,
		required,
		error,
		helperText
	} = props

	return (
		<TextField
			required={required}
			error={error}
			label={label}
			margin="normal"
			value={value}
			onChange={change}
			placeholder={placeholder}
			helperText={helperText}
		/>
	)
}

InputText.propTypes = {
	change: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTpyes.string,
	required: PropTypes.bool,
	error: PropTypes.bool,
	helperText: PropTypes.string
}

export default InputText
