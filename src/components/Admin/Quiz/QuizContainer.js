import React, { Component } from 'react'
import TemplateLeft from '../Template/TemplateLeft'
import TemplateRight from '../Template/TemplateRight'
import QuizList from './QuizList'
import QuizDetails from './QuizDetails'
import QuizCreate from './QuizCreate'
import Buttons from '../../Input/Buttons'
import { connect } from 'react-redux'
import * as quizAction from '../../../modules/quiz'

class QuizContainer extends Component {
	state = {
		quizList: [],
		creating: false
	}

	componentDidMount() {
		this.props.fetchQuiz()
	}

	componentWillReceiveProps(nextProps) {
		const { quizList } = nextProps.quiz
		quizList && this.setState({ quizList })
	}

	render() {
		const { quizList, creating } = this.state
		const { quiz } = this.props
		return (
			<div className="row template-wrapper">
				<TemplateLeft>
					<QuizList quizList={quizList} />
				</TemplateLeft>

				<TemplateRight>
					{quiz.selected.q && <QuizDetails details={quiz.selected} />}
					{quiz.creating && <QuizCreate num={quizList.length} />}
				</TemplateRight>

				<div className="fixed-bottom mb-4 mr-4">
					<Buttons
						className="float-right"
						fab
						color="primary"
						text="+"
						click={() => this.props.createNewQuiz(true)}
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
