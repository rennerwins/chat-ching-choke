import React from 'react'
import Button from 'material-ui/Button'

const Buttons = props => {
	const { raised, color, disabled, text, click, className, fab, dense } = props
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
			{text}
		</Button>
	)
}

export default Buttons
