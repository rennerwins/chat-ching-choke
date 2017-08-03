import React, { Component } from 'react'
import QuizList from '../components/QuizList'
import { firebaseApp } from '../utils/firebase'
import { connect } from 'react-redux'

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
							PSID={this.props.PSID}
							currentQuiz={this.state.currentQuiz}
							questions={this.state.questions}
						/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { PSID: state.PSID }
}

export default connect(mapStateToProps, null)(Quiz)
