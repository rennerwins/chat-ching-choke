import React, { Component } from 'react'
import { firebaseApp } from '../../utils/firebase'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const UserAvatar = styled.img`
	position: relative;
	opacity: 1;
	width: 100px;
	height: 100px;
	border-radius: 50px;
	text-align: center;
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3), 0px 2px 10px rgba(0, 0, 0, 0.5);
	animation: ${fadeIn} 0.3s;
`

class AdminParticipants extends Component {
	state = {
		participants: []
	}

	componentDidMount() {
		firebaseApp.database().ref('participants').on('child_added', snapshot => {
			this.setState(prevState => ({
				participants: [...prevState.participants, snapshot.val()]
			}))
		})
	}

	render() {
		let { participants } = this.state
		return (
			<div className="row">
				{participants.length === 0 &&
					<div className="col-12 text-center">
						<h1>ไม่มีคนเล่นด้วยเลย :(</h1>
					</div>}

				{participants.length > 0 &&
					<div className="col-12 text-center">
						<h1>
							จำนวนผู้เข้าเล่น: {participants.length}
						</h1>
					</div>}

				{participants.length > 0 &&
					participants.reverse().map((user, index) => {
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

export default AdminParticipants
