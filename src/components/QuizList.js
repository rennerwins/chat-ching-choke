import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

const Waiting = styled.h1`
  margin-top: 30px;
`
const QuestionWrapper = styled.div`
  padding: 10px;
`
const AnswerItem = styled.button`
  background-color: white;
  width: 100%;
  padding: 12px;
  border: none;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 6px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`
const Question = styled.h1`
  margin-top: 20px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.6;
`

const Home = styled.span`
  color: #9E9E9E;
  font-size: 30px;
  position: absolute;
  top: 5px;
  left: 25px;
  z-index: 100;
`

const QuizList = props => {
	return (
		<div className="row">
			<Link to="/">
				<Home>
					<i className="fa fa-home" aria-hidden="true" />
				</Home>
			</Link>

			{props.currentQuiz === -1
				? <div className="col-12 text-center">
						<Waiting>กรุณารอคำถาม</Waiting>
					</div>
				: <QuizItem
						quiz={props.questions[props.currentQuiz]}
						currentQuiz={props.currentQuiz}
					/>}
		</div>
	)
}

const QuizItem = props => {
	let { quiz, currentQuiz } = props
	return (
		<div className="col-12 text-center">
			{/* <CurrentNumber>ข้อที่ {currentQuiz + 1}</CurrentNumber> */}

			{quiz &&
				<QuestionWrapper>
					<Question>{quiz.q}</Question>
					{quiz.choices.map((ans, index) => {
						return <Answer key={index} ans={ans} />
					})}
				</QuestionWrapper>}

		</div>
	)
}

const Answer = props => {
	return <Button color="primary" className="answer-button">{props.ans}</Button>
}

export default QuizList
