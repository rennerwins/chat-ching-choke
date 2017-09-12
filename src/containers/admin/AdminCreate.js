import React, { Component } from 'react'
import styled from 'styled-components'
import { fetchQuiz } from '../../modules/quiz'
import { connect } from 'react-redux'
import QuizItem from '../../components/Admin/Quiz/QuizItem'
import QuizQuestion from '../../components/Admin/Quiz/QuizQuestion'
import QuizCreate from '../../components/Admin/Quiz/QuizCreate'
import QuizEdit from '../../components/Admin/Quiz/QuizEdit'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { firebaseApp } from '../../utils/firebase'

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
const QuestionButton = styled.button`
	width: 50%;
	border: none;
	padding: 16px;
	background-color: ${props => (props.clear ? '#F44336' : '#3F51B5')};
	cursor: pointer;
	font-size: 20px;
	text-transform: uppercase;
	color: #fff;
	font-weight: bold;
	&:hover {
		text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
		background-color: ${props => (props.clear ? '#C62828' : '#283593')};
	}
`

class AdminCreate extends Component {
	state = {
		quizList: [],
		selectedQuiz: {},
		editing: false,
		creating: true,
		num: 0,
		selectedNum: null,
		clearDialog: false
	}

	componentDidMount() {
		this.props.fetchQuiz()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.quiz) {
			this.setState({
				quizList: nextProps.quiz,
				num: nextProps.quiz.length
			})
		}
	}

	handleSelectQuestion = index => {
		this.setState({
			selectedQuiz: this.state.quizList[index],
			creating: false,
			editing: false,
			selectedNum: index
		})
	}

	editQuiz = () => {
		this.setState({ editing: true, creating: false })
	}

	handleRequestClose = () => {
		this.setState({ clearDialog: false })
	}

	handleClearAllQuiz = () => {
		firebaseApp
			.database()
			.ref('quiz')
			.remove()
		this.handleRequestClose()
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

					<QuestionButton
						clear
						onClick={() => this.setState({ clearDialog: true })}
					>
						Clear All
					</QuestionButton>

					<QuestionButton
						onClick={() => this.setState({ creating: true, editing: false })}
					>
						Add more
					</QuestionButton>
				</QuizListWrapper>

				<QuizCreateWrapper className="col">
					{!this.state.creating &&
					!this.state.editing && (
						<QuizQuestion
							question={this.state.selectedQuiz}
							edit={this.editQuiz}
						/>
					)}

					{this.state.creating && <QuizCreate num={this.state.num} />}

					{this.state.editing && (
						<QuizEdit
							num={this.state.selectedNum}
							quiz={this.state.selectedQuiz}
						/>
					)}
				</QuizCreateWrapper>

				<Dialog
					open={this.state.clearDialog}
					onRequestClose={this.handleRequestClose}
				>
					<DialogContent>
						<DialogTitle>
							<h4>ต้องการลบคำถามทั้งหมด?</h4>
						</DialogTitle>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleRequestClose} color="primary">
							ยกเลิก
						</Button>
						<Button onClick={this.handleClearAllQuiz} color="primary">
							ตกลง
						</Button>
					</DialogActions>
				</Dialog>
			</QuizWrapper>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(mapStateToProps, { fetchQuiz })(AdminCreate)
