import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import * as api from '../utils/api'
import Answer from './Answer'

const Waiting = styled.h1`margin-top: 30px;`
const QuestionWrapper = styled.div`padding: 10px;`
const AnswerItem = styled.button`
	background-color: white;
	width: 100%;
	padding: 12px;
	border: none;
	margin-bottom: 10px;
	font-size: 18px;
	font-weight: 500;
	border-radius: 6px;
	box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
		0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
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
	color: #9e9e9e;
	font-size: 30px;
	position: absolute;
	top: 5px;
	left: 25px;
	z-index: 100;
`

class QuizList extends Component {
	submitAnswer = () => {
		console.log('submit', this.props.PSID)
	}

	render() {
		return (
			<div className="row">
				<Link to="/">
					<Home>
						<i className="fa fa-home" aria-hidden="true" />
					</Home>
				</Link>

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
	let { quiz, currentQuiz, PSID, click } = props
	return (
		<div className="col-12 text-center">
			{/* <CurrentNumber>ข้อที่ {currentQuiz + 1}</CurrentNumber> */}

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
