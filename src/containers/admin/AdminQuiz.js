import React, { Component } from 'react'
import styled from 'styled-components'
import * as api from '../../utils/api'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import { firebaseApp } from '../../utils/firebase'

const Label = styled.label`
	margin-top: 30px;
	color: black;
	font-size: 30px;
`

const Timer = styled.h1`font-size: 60px;`

class AdminQuiz extends Component {
	state = {
		second: 60,
		countdown: 0,
		playing: false
	}

	// componentDidMount() {
	//   this.getQuizStatus()
	// }

	sendQuiz = async () => {
		await api.sendQuiz(true, this.state.second)
	}

	repeatQuiz = () => {
		api.sendQuiz(false, this.state.second)
	}

	increaseTimer = () => {
		this.setState(prevState => ({
			second: prevState.second + 10
		}))
	}

	decreaseTimer = () => {
		this.setState(prevState => ({
			second: prevState.second - 10
		}))
	}

	countdown = () => {
		let timer = setInterval(() => {
			this.setState(prevState => ({
				second: prevState.second - 1
			}))

			if (this.state.second === 0) {
				clearInterval(timer)
				setTimeout(() => {
					this.setState({ second: 60 })
				}, 3000)
			}
		}, 1000)
	}

	sendResult = () => {
		api.sendResult()
	}

	sendRequest = () => {
		api.sendRequest()
	}

	// getQuizStatus = async () => {
	// 	const res = await api.getQuizStatus()
	// 	const { currentQuiz, quiz, quizLength } = res
	// 	this.setState({
	// 		currentQuiz,
	// 		quiz,
	// 		quizLength
	// 	})
	// }

	render() {
		return (
			<div className="row">
				<div className="col-12 text-center">
					<Label>ระยะเวลาในการเปิดรับคำตอบ (Default = 60 วินาที)</Label>
				</div>

				<div className="col-4 text-center mt-3">
					<Button raised onClick={this.decreaseTimer} className="timer-button">
						-
					</Button>
				</div>

				<div className="col-4 text-center">
					<Timer className="my-0">
						{this.state.second}
					</Timer>
				</div>

				<div className="col-4 text-center mt-3">
					<Button raised onClick={this.increaseTimer} className="timer-button">
						+
					</Button>
				</div>

				<div className="col-12 text-center mt-3">
					<Button raised color="accent" onClick={this.sendRequest}>
						ส่งคำเชิญ
					</Button>
				</div>

				<div className="col-12 text-center mt-3">
					<Button raised color="primary" onClick={this.sendQuiz}>
						ส่งคำถามถัดไป
					</Button>
				</div>

				<div className="col-12 text-center mt-3">
					<Button raised color="primary" onClick={this.repeatQuiz}>
						ส่งคำถามเดิม
					</Button>
				</div>

				<div className="col-12 text-center mt-3">
					<Link to="/scores">
						<Button raised color="default" onClick={this.repeatQuiz}>
							ดูคะแนนรวม
						</Button>
					</Link>
				</div>

				<div className="col-12 text-center mt-3">
					<Button raised onClick={this.sendResult}>
						ส่งคะแนนรวม
					</Button>
				</div>
			</div>
		)
	}
}
export default AdminQuiz
