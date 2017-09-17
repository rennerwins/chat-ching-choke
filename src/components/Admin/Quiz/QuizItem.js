import React from 'react'
import CardWrapper from '../../Common/CardWrapper'

const QuizItem = ({ item, click, index }) => {
	return (
		<CardWrapper className="pointer">
			<div onClick={click}>
				<small className="text-muted">{item.type}</small>
				<p className="mb-0"><span>{index + 1}.</span> {item.q}</p>
			</div>
		</CardWrapper>
	)
}

export default QuizItem
