import React, { Component } from 'react'
import styled from 'styled-components'
import Answer from './Answer'

const Waiting = styled.h1`margin-top: 30px;`
const QuestionWrapper = styled.div`padding: 10px;`
const Question = styled.h1`
	margin-top: 20px;
	height: 180px;
	display: flex;
	align-items: center;
	justify-content: center;
	line-height: 1.6;
	font-size: 20px;
`

class QuizList extends Component {
	render() {
		// let { selected, currentQuiz, questions, cssName } = this.props.questionDetails 
		let { questionDetails } = this.props
		return (
			<div className="row">
				{questionDetails.currentQuiz === -1
					? <div className="col-12 text-center">
							<Waiting>กรุณารอคำถาม</Waiting>
						</div>
					: <QuizItem
							questionDetails={questionDetails}
							onSelect={this.props.onSelect}
							PSID={this.props.PSID}
							quiz={questionDetails.questions[questionDetails.currentQuiz]}
						/>}
			</div>
		)
	}
}

const QuizItem = props => {
	let { quiz, questionDetails, onSelect, PSID } = props
	return (
		<div className="col-12 text-center">
			{quiz &&
				<QuestionWrapper>
					<Question>
						{quiz.q}
					</Question>
					{quiz.choices.map((ans, index) => {
						return <Answer cssName={questionDetails.num === index ? 'answer-button-selected' : 'answer-button'} selected={questionDetails.selected} onSelect={onSelect} PSID={PSID} key={index} ans={ans} number={index} />
					})}
				</QuestionWrapper>}
		</div>
	)
}

export default QuizList
