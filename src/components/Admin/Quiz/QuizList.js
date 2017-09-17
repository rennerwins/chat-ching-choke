import React, { Component } from 'react'
import QuizItem from './QuizItem'
import { connect } from 'react-redux'
import { selectedQuiz } from '../../../modules/quiz'

class QuizList extends Component {
	handleSelection = index => {
		let quizItem = this.props.quizList[index]
		this.props.selectedQuiz(quizItem, index)
	}

	render() {
		const { quizList } = this.props
		return (
			<div>
				{quizList.map((item, index) => (
					<div className="col-12" key={index}>
						<QuizItem click={() => this.handleSelection(index)} item={item} index={index} />
					</div>
				))}
				{this.props.children}
			</div>
		)
	}
}

export default connect(null, { selectedQuiz })(QuizList)
