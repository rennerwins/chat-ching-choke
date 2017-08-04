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
	submitAnswer = () => {
		console.log('submit', this.props.PSID)
	}

	render() {
		return (
			<div className="row">

				{this.props.currentQuiz === -1
					? <div className="col-12 text-center">
							<Waiting>กรุณารอคำถาม</Waiting>
						</div>
					: <QuizItem
							click={this.submitAnswer}
							PSID={this.props.PSID}
							quiz={this.props.questions[this.props.currentQuiz]}
							currentQuiz={this.props.currentQuiz}
						/>}
			</div>
		)
	}
}

const QuizItem = props => {
	let { quiz, PSID } = props
	return (
		<div className="col-12 text-center">
			{quiz &&
				<QuestionWrapper>
					<Question>
						{quiz.q}
					</Question>
					{quiz.choices.map((ans, index) => {
						return <Answer PSID={PSID} key={index} ans={ans} />
					})}
				</QuestionWrapper>}
		</div>
	)
}

export default QuizList
