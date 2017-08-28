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
	width: 50px;
	height: 50px;
	border-radius: 4px;
	text-align: center;
	animation: ${fadeIn} 0.5s;
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
				<div className="col-12 col-md-4">
					<div className="row">
						<div className="col-12 text-center">
							<h4>จำนวนผู้เข้าร่วม : {this.state.participants.length}</h4>
						</div>

						{participants.length > 0 &&
							participants.reverse().map((user, index) =>
								<div className="col px-0 my-2 mx-1 text-center" key={user.profilePic}>
									<UserAvatar src={user.profilePic} alt="user-avatar" />
								</div>
							)}
					</div>
				</div>
			</div>
		)
	}
}

export default AdminParticipants
