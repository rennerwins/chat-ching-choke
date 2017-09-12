import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'

const CardWrapper = props => {
	return (
		<Card className="mt-3">
			<CardContent>{props.children}</CardContent>
		</Card>
	)
}

export default CardWrapper
