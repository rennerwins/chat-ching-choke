import React, { Component } from 'react'
import * as api from '../../utils/api'
import { firebaseApp } from '../../utils/firebase'
import styled from 'styled-components'

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

			this.state.currentQuiz !== null &&
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
		let { correctUsers } = this.state

		return (
			<div className="row">

				{correctUsers &&
					correctUsers.map((user, index) => {
						return (
							<div className="col-2 mb-3" key={index}>
								<UserAvatar src={user.profilePic} alt="user-avatar" />
							</div>
						)
					})}
			</div>
		)
	}
}

export default AdminScores
