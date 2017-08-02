import React, { Component } from 'react'
import QuizList from '../components/QuizList'
import { firebaseApp } from '../utils/firebase'

class Quiz extends Component {
	state = {
		currentQuiz: -1,
		questions: []
	}

	componentDidMount() {
		this.checkCurrentQuiz()
		this.getAllQuestion()
	}

	checkCurrentQuiz = () => {
		firebaseApp.database().ref('currentQuiz').on('value', snapshot => {
			this.setState({ currentQuiz: snapshot.val() })
		})
	}

	getAllQuestion = () => {
		firebaseApp.database().ref('quiz').once('value', snapshot => {
			this.setState({ questions: snapshot.val() })
		})
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<QuizList
							currentQuiz={this.state.currentQuiz}
							questions={this.state.questions}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default Quiz
