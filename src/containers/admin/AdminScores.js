import React, { Component } from 'react'
import * as api from '../../utils/api'
import { firebaseApp } from '../../utils/firebase'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import _ from 'lodash'

const Choice = styled.div`
	background-color: #424242;
	color: white;
	height: 50px;
	width: 50px;
	border-radius: 50%;
	text-align: center;
	padding-top: 10px;
	font-size: 20px;
	box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
`

const scoreBar = keyframes`
	0% {
		opacity: 0;
		transform-origin: left;
		transform: scaleX(0);
	}
	100% {
		opacity: 1;
		transform-origin: left;
		transform: scaleX(1);
	}
`

const BarChart = styled.div`
	display: inline-block;
	height: 50px;
	width: ${props => props.point * 2.8 || 0}px;
	background-image: linear-gradient(
		-225deg,
		#22e1ff 0%,
		#1d8fe1 48%,
		#625eb1 100%
	);
	border-radius: 4px;
	box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
	animation: ${scoreBar} 1.5s ease-in-out 0s forwards;
	transform-origin: left;
`

class AdminScores extends Component {
	state = {
		currentQuiz: null,
		answerRate: [],
		correctUsers: []
	}

	showRandomCorrectUsers = currentQuiz => {
		api
			.showRandomCorrectUsers(currentQuiz)
			.then(({ answerRate, correctUsers }) => {
				let answers = _.values(answerRate)
				this.setState({
					answerRate: answers,
					correctUsers
				})
			})
	}

	showResults = () => {
		this.setState({
			answerRate: [],
			correctUsers: []
		})

		firebaseApp.database().ref('currentQuiz').once('value', snapshot => {
			this.setState({ currentQuiz: snapshot.val() })

			this.state.currentQuiz !== -1 &&
				this.showRandomCorrectUsers(this.state.currentQuiz)
		})
	}

	render() {
		return (
			<div className="row">
				<div className="col-12 col-md-6">
					{this.state.answerRate.map((ans, index) => {
						return (
							<div className="row my-4 align-items-center" key={index}>
								<div className="col-2">
									<Choice>
										{index + 1}
									</Choice>
								</div>
								<div className="col-10">
									<BarChart point={ans} />{' '}
									<h3 className="mb-0 answer-rate">{ans}%</h3>
								</div>
							</div>
						)
					})}
				</div>

				<div className="col-12 col-md-6 fixed-bottom mb-3 text-center">
					<button className="btn btn-primary" onClick={this.showResults}>
						Show Result
					</button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(mapStateToProps, null)(AdminScores)
