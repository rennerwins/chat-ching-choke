import React, { Component } from 'react'
import TemplateLeft from '../Template/TemplateLeft'
import TemplateRight from '../Template/TemplateRight'
import QuizList from './QuizList'
import QuizDetails from './QuizDetails'
import QuizCreate from './QuizCreate'
import QuizEdit from './QuizEdit'
import Buttons from '../../Input/Buttons'
import { connect } from 'react-redux'
import * as quizAction from '../../../modules/quiz'

class QuizContainer extends Component {
	state = {
		quizList: []
	}

	componentDidMount() {
		this.props.fetchQuiz()
	}

	componentWillReceiveProps(nextProps) {
		const { quizList } = nextProps.quiz
		quizList && this.setState({ quizList })
	}

	render() {
		const { quizList } = this.state
		const { quiz } = this.props
		return (
			<div className="row template-wrapper">
				<TemplateLeft>
					<QuizList quizList={quizList} />
				</TemplateLeft>

				<TemplateRight>
					{quiz.selected.q &&
					!quiz.editing && (
						<QuizDetails
							details={quiz.selected}
							edit={() => this.props.editQuiz(true)}
						/>
					)}
					{quiz.creating && (
						<QuizCreate
							num={quizList.length}
							cancel={() => this.props.createNewQuiz(false)}
						/>
					)}
					{quiz.editing && (
						<QuizEdit
							quiz={quiz.selected}
							cancel={() => this.props.editQuiz(false)}
						/>
					)}
				</TemplateRight>

				<div className="fab-button">
					<Buttons
						className="float-right"
						fab
						color="primary"
						text="+"
						click={() => this.props.createNewQuiz(true)}
					/>

					<Buttons
						className="float-right mr-3"
						fab
						color="accent"
						text="DEL"
						click={() => this.props.deleteAllQuiz()}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ quiz }) => {
	return { quiz }
}

export default connect(mapStateToProps, { ...quizAction })(QuizContainer)
