import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'

const CheckBox = props => {
	const { value, label, change } = props

	return (
		<FormControlLabel
			control={<Checkbox value={value} />}
			label={label}
			onChange={change}
		/>
	)
}

export default CheckBox
