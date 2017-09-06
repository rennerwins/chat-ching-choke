import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'

const LinkButton = props => {
  const { to, raised, color, text } = props

	return (
		<Link to={to}>
			<Button raised={raised} color={color}>
				{text}
			</Button>
		</Link>
	)
}

export default LinkButton
