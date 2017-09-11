import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const QuizItemWrapper = styled.div`
  border-bottom: 1px solid lightgrey;
  padding: 10px;
`

const QuizItem = props => {
  const { q, a, choices, type } = props.quiz
  const { index, click } = props

	return (
		<QuizItemWrapper>
			<p onClick={click}>{index+1}. {q}</p>
		</QuizItemWrapper>
	)
}

QuizItem.propTypes = {
	quiz: PropTypes.object
}

export default QuizItem
