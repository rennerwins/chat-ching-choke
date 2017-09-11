import React from 'react'
import Button from 'material-ui/Button'

const Buttons = props => {
	const { raised, color, disabled, text, click, className } = props
	return (
		<Button
			className={className}
			raised={raised || true}
			color={color}
			disabled={disabled}
			onClick={click}
		>
			{text}
		</Button>
	)
}

export default Buttons
