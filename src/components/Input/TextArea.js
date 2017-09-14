import React from 'react'
import TextField from 'material-ui/TextField'

const TextArea = ({ label, placeholder, value, change, multiline, fullWidth, rows }) => {
	return (
		<TextField
			label={label}
			placeholder={placeholder}
			value={value}
			multiline={multiline}
			onChange={change}
      fullWidth={fullWidth}
			rows={rows || 2}
		/>
	)
}

export default TextArea
