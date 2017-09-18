import React, { Component } from 'react'
import styled from 'styled-components'
import Answer from './Answer'
import InputAnswer from './InputAnswer'

const Waiting = styled.h1`margin-top: 30px;`
const QuestionWrapper = styled.div`padding: 10px;`
const Question = styled.h1`
	min-height: 5em;
	display: flex;
	align-items: center;
	justify-content: center;
	line-height: 1.6;
	font-size: 20px;
	margin: 1em 0;
`

class QuizList extends Component {
	state = {
		message: ''
	}

	render() {
		let {
			onAnswer,
			onSelect,
			PSID,
			quiz,
			currentQuiz,
			selected,
			answered
		} = this.props

		return (
			<div className="row">
				{currentQuiz === -1 ? (
					<div className="col-12 text-center">
						<Waiting>กรุณารอคำถาม</Waiting>
					</div>
				) : (
					<QuizItem
						questionDetails={quiz}
						onSelect={onSelect}
						onAnswer={onAnswer}
						PSID={PSID}
						quiz={quiz[currentQuiz]}
						selected={selected}
						answered={answered}
						currentQuiz={currentQuiz}
					/>
				)}
			</div>
		)
	}
}

const QuizItem = props => {
	let {
		quiz,
		onSelect,
		PSID,
		onAnswer,
		selected,
		answered,
		currentQuiz
	} = props

	return (
		<div className="col-12 text-center">
			{quiz && (
				<QuestionWrapper>
					<Question>
						ข้อที่ {currentQuiz + 1} : {quiz.q}
					</Question>

					{quiz.type === 'STRING' && (
						<InputAnswer PSID={PSID} onAnswer={onAnswer} />
					)}

					{!quiz.stringAnswer &&
						quiz.type !== 'STRING' &&
						quiz.choices.map((ans, index) => {
							return (
								<Answer
									cssName={
										answered === index ? (
											'answer-button-selected'
										) : (
											'answer-button'
										)
									}
									selected={selected}
									onSelect={onSelect}
									PSID={PSID}
									key={index}
									ans={ans}
									number={index}
								/>
							)
						})}
				</QuestionWrapper>
			)}
		</div>
	)
}

export default QuizList
