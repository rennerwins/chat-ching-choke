import React from 'react'
import CardWrapper from '../../Common/CardWrapper'

const QuizItem = ({ item, click }) => {
	return (
		<CardWrapper className="pointer">
			<div onClick={click}>
				<small className="text-muted">{item.type}</small>
				<p className="mb-0">{item.q}</p>
			</div>
		</CardWrapper>
	)
}

export default QuizItem
