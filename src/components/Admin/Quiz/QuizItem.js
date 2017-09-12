import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const QuizItemWrapper = styled.div`
	border-bottom: 1px solid lightgrey;
	padding: 10px;
	cursor: pointer;
	&:hover {
		background-color: #f1f1f1;
	}
`

const QuizItem = props => {
	const { q } = props.quiz
	const { index, click } = props

	return (
		<QuizItemWrapper onClick={click}>
			<p>{index + 1}. {q}</p>
		</QuizItemWrapper>
	)
}

QuizItem.propTypes = {
	quiz: PropTypes.object
}

export default QuizItem
