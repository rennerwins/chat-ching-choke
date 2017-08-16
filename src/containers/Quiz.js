import React, { Component } from 'react'
import QuizList from '../components/QuizList'
import styled from 'styled-components'
import { firebaseApp } from '../utils/firebase'
import { connect } from 'react-redux'

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
		firebaseApp.database().ref('quiz').on('value', snapshot => {
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

	onAnswer = () => {
		this.setState({
			num: 0
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
							onAnswer={this.onAnswer}
							PSID={this.props.userDetails.PSID}
						/>
					</div>

					{this.state.num === null &&
						this.state.currentQuiz !== -1 &&
						this.state.currentQuiz < this.state.questions.length - 1 &&
						<div className="col-12 text-center">
							<Small>*คิดให้ดีก่อนตอบ ตอบแล้วเปลี่ยนใจไม่ได้นะจ๊ะ</Small>
						</div>}

					{this.state.num !== null &&
						this.state.currentQuiz !== -1 &&
						<div className="col-12 text-center">
							<h5 style={styles.waiting}>กรุณารอคำถามข้อถัดไป</h5>
						</div>}

					{this.state.currentQuiz === this.state.questions.length &&
						<div className="col-12 text-center mt-3">
							<h1>
								ขอบคุณที่ร่วมสนุกกับ <span>แชทชิงโชค</span>{' '}
								เจอกันใหม่ทุกวันจันทร์ 2 ทุ่ม
							</h1>
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
