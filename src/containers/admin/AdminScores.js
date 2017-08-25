import React, { Component } from 'react'
import * as api from '../../utils/api'
import { firebaseApp } from '../../utils/firebase'
import styled from 'styled-components'
import { connect } from 'react-redux'

const UserAvatar = styled.img`
	position: relative;
	opacity: 1;
	width: 100px;
	height: 100px;
	border-radius: 50px;
	text-align: center;
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3), 0px 2px 10px rgba(0, 0, 0, 0.5);
`

class AdminScores extends Component {
	state = {
		currentQuiz: null,
		answerRate: {},
		correctUsers: []
	}

	componentDidMount() {
		firebaseApp.database().ref('currentQuiz').on('value', snapshot => {
			this.setState({ currentQuiz: snapshot.val() })

			this.state.currentQuiz !== -1 &&
				this.showRandomCorrectUsers(this.state.currentQuiz)
		})
	}

	showRandomCorrectUsers = currentQuiz => {
		api
			.showRandomCorrectUsers(currentQuiz)
			.then(({ answerRate, correctUsers }) => {
				this.setState({
					answerRate,
					correctUsers
				})
			})
	}

	render() {
		// let { correctUsers, answerRate } = this.state

		return (
			<div className="row">
				<div className="col-3 mb-3 text-center">
					<p>ข้อที่ 1</p>
					<h4>25%</h4>
				</div>
				<div className="col-3 text-center">
					<p>ข้อที่ 2</p>
					<h4>25%</h4>
				</div>
				<div className="col-3 text-center">
					<p>ข้อที่ 3</p>
					<h4>25%</h4>
				</div>
				<div className="col-3 text-center">
					<p>ข้อที่ 4</p>
					<h4>25%</h4>
				</div>

				{/* {correctUsers &&
					correctUsers.map((user, index) => {
						return (
							<div className="col-2 mb-3" key={index}>
								<UserAvatar src={user.profilePic} alt="user-avatar" />
							</div>
						)
					})} */}

				<div className="col-2 mb-3">
					<UserAvatar src={this.props.user.avatar} alt="user-avatar" />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(mapStateToProps, null)(AdminScores)
