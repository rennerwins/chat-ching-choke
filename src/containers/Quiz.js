import React, { Component } from 'react'
import QuizList from '../components/QuizList'
import styled from 'styled-components'
import { firebaseApp } from '../utils/firebase'
import { connect } from 'react-redux'

const NumberOfQuiz = styled.p`color: #9e9e9e;`
const Small = styled.small`color: #9e9e9e;`
const styles = {
	waiting: {
		color: '#E53935'
	}
}

class Quiz extends Component {
	state = {
		currentQuiz: -1,
		questions: [],
		selected: false,
		cssName: 'answer-button',
		num: null
	}

	componentDidMount() {
		this.checkCurrentQuiz()
		this.getAllQuestion()
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.state.currentQuiz !== nextState.currentQuiz) {
			this.setState({ selected: false, num: null })
		}
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

	onSelected = number => {
		this.setState({
			selected: true,
			cssName: 'answer-button-selected',
			num: number
		})
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<QuizList
							questionDetails={this.state}
							onSelect={this.onSelected}
							PSID={this.props.userDetails.PSID}
						/>
					</div>

					{this.state.num === null &&
						this.state.currentQuiz !== -1 &&
						<div className="col-12 text-center">
							<Small>*คิดให้ดีก่อนตอบ ตอบแล้วเปลี่ยนใจไม่ได้นะจ๊ะ</Small>
						</div>}

					{this.state.num !== null &&
						this.state.currentQuiz !== -1 &&
						<div className="col-12 text-center">
							<h5 style={styles.waiting}>กรุณารอคำถามข้อถัดไป</h5>
						</div>}

					{/* <div className="col-12 fixed-bottom text-center">
						{this.state.currentQuiz !== -1 &&
							<NumberOfQuiz>
								ข้อที่ {this.state.currentQuiz + 1} /{' '}
								{this.state.questions.length}
							</NumberOfQuiz>}
					</div> */}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { PSID: state.PSID }
}

export default connect(mapStateToProps, null)(Quiz)
