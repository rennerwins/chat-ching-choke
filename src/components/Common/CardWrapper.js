import React from 'react'
import Card, { CardContent } from 'material-ui/Card'

const CardWrapper = props => {
	return (
		<Card className={`mt-3 ${props.className}`}>
			<CardContent>{props.children}</CardContent>
		</Card>
	)
}

export default CardWrapper
