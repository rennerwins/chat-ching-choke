import React, { Component } from 'react'
import styled from 'styled-components'
import { fetchQuiz } from '../../modules/quiz'
import { connect } from 'react-redux'
import QuizItem from '../../components/Admin/Quiz/QuizItem'
import QuizQuestion from '../../components/Admin/Quiz/QuizQuestion'
import QuizCreate from '../../components/Admin/Quiz/QuizCreate'

const QuizWrapper = styled.div`height: 100%;`
const QuizListWrapper = styled.div`
	background-color: #fff;
	border-right: 1px solid lightgrey;
	height: 100%;
	overflow-y: scroll;
`
const QuizCreateWrapper = styled.div`
	background-color: #f1f1f1;
	height: 100%;
	overflow-y: scroll;
	padding-bottom: 16px;
`
const CreateNewQuestionButton = styled.button`
	width: 100%;
	padding: 16px;
	border: 4px dashed #42a5f5;
	border-radius: 4px;
	background-color: #fff;
	cursor: pointer;
	font-size: 20px;
	text-transform: uppercase;
	color: #1976d2;
	font-weight: bold;
	&:hover {
		background-color: #90caf9;
	}
`

class AdminCreate extends Component {
	state = {
		quizList: [],
		selectedQuiz: {},
		edit: false,
    creating: true,
    num: null
	}

	componentDidMount() {
		this.props.fetchQuiz()
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ quizList: nextProps.quiz, num: nextProps.quiz.length })
	}

	handleSelectQuestion = index => {
		this.setState({ selectedQuiz: this.state.quizList[index], creating: false })
	}

	render() {
		return (
			<QuizWrapper className="row">
				<QuizListWrapper className="col-4 px-0">
					{this.state.quizList.length > 0 &&
						this.state.quizList.map((q, index) => (
							<QuizItem
								quiz={q}
								key={index}
								index={index}
								click={() => this.handleSelectQuestion(index)}
							/>
						))}

					<CreateNewQuestionButton
						onClick={() => this.setState({ creating: true })}
					>
						+ Add more
					</CreateNewQuestionButton>
				</QuizListWrapper>

				<QuizCreateWrapper className="col">
					{!this.state.creating ? (
						<QuizQuestion question={this.state.selectedQuiz} />
					) : (
						<QuizCreate num={this.state.num} />
					)}
				</QuizCreateWrapper>
			</QuizWrapper>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(mapStateToProps, { fetchQuiz })(AdminCreate)
