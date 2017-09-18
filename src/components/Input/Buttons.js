import React from 'react'
import Button from 'material-ui/Button'

const Buttons = props => {
	const { raised, color, disabled, text, click, className, fab, dense, children } = props
	return (
		<Button
			dense={dense}
			fab={fab}
			className={className}
			raised={raised}
			color={color}
			disabled={disabled}
			onClick={click}
		>
			{text || children}
		</Button>
	)
}

export default Buttons
