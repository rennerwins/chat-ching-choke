import React from 'react'

const QuizQuestion = props => {
	const { question } = props

	return (
		<div className="container">
			<h1>{question.q}</h1>
			{question.choices &&
				question.choices.map(choice => <p key={choice}>{choice}</p>)}
			{Array.isArray(question.a) &&
				question.a.map(ans => <p key={ans}>{ans}</p>)}
		</div>
	)
}

export default QuizQuestion
