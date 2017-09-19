import React, { Component } from 'react'
import QuizList from '../components/Quiz/QuizList'
import styled from 'styled-components'
import { firebaseApp } from '../utils/firebase'
import { connect } from 'react-redux'
import { fetchQuiz } from '../modules/quiz'
import { checkCanEnter, checkPlaying } from '../modules/status'
import { checkParticipant } from '../modules/user'
import Youtube from '../components/Quiz/Youtube'

const Small = styled.small`
	color: #9e9e9e;
	text-align: center;
`
const styles = {
	waiting: {
		color: '#E53935'
	}
}

class Quiz extends Component {
	state = {
		currentQuiz: -1,
		selected: false,
		cssName: 'answer-button',
		num: null,
		liveURL: ''
	}

	componentDidMount() {
		this.props.checkCanEnter()
		this.props.checkPlaying()
		this.checkCurrentQuiz()
		this.props.fetchQuiz()
		firebaseApp
			.database()
			.ref('liveURL')
			.on('value', snapshot => {
				this.setState({ liveURL: snapshot.val() })
			})
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.user.PSID) {
			this.props.checkParticipant(nextProps.user, nextProps.quiz)
		}
		if (this.state.currentQuiz !== nextState.currentQuiz) {
			this.setState({ selected: false, num: null })
		}
	}

	checkCurrentQuiz = () => {
		firebaseApp
			.database()
			.ref('currentQuiz')
			.on('value', snapshot => {
				this.setState({ currentQuiz: snapshot.val() })
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
		this.setState({ num: 0 })
	}

	render() {
		return (
			<div className="container">
				<div className="row align-items-center">
					<div className="col-12 col-md-6 text-center">
						<Youtube liveURL={this.state.liveURL} />
					</div>

					<div className="col-12 col-md-6">
						{this.state.currentQuiz === this.props.quiz.quizList.length && (
							<h1 className="text-center" style={{ whiteSpace: 'normal' }}>
								ขอบคุณที่ร่วมสนุกกับ{' '}
								<span style={{ color: '#C83430' }}>แชทชิงโชค</span>{' '}
								เจอกันใหม่ทุกวันจันทร์ 2 ทุ่ม
							</h1>
						)}

						<QuizList
							currentQuiz={this.state.currentQuiz}
							onSelect={this.onSelected}
							onAnswer={this.onAnswer}
							PSID={this.props.user.PSID}
							selected={this.state.selected}
							answered={this.state.num}
							quiz={this.props.quiz.quizList}
						/>

						<div className="row">
							{this.state.num === null &&
							this.state.currentQuiz !== -1 &&
							this.state.currentQuiz < this.props.quiz.quizList.length - 1 && (
								<div className="col-12 text-center">
									<Small>*คิดให้ดีก่อนตอบ ตอบแล้วเปลี่ยนใจไม่ได้นะจ๊ะ</Small>
								</div>
							)}

							{this.state.num !== null &&
							this.state.currentQuiz !== -1 && (
								<div className="col-12 text-center">
									<h5 style={styles.waiting}>กรุณารอคำถามข้อถัดไป</h5>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(mapStateToProps, {
	fetchQuiz,
	checkCanEnter,
	checkPlaying,
	checkParticipant
})(Quiz)
