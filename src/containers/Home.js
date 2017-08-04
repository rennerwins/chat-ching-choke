import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserProfileCard from '../components/UserProfileCard'
import SectionDivider from '../components/SectionDivider'
import Button from 'material-ui/Button'
import styled from 'styled-components'
import { firebaseApp } from '../utils/firebase'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

const styles = {
	button: {
		marginRight: '20px'
	}
}

const Span = styled.span`
	text-decoration: underline;
	color: #757575;
	font-size: 14px;
`

class Home extends Component {
	static propTypes = {
		userDetails: PropTypes.object
	}

	state = {
		playing: false,
		no: false,
		quiz: {}
	}

	componentDidMount() {
		firebaseApp.database().ref('playing').on('value', snapshot => {
			this.setState({ playing: snapshot.val() })
		})

		firebaseApp.database().ref('quiz').once('value', snapshot => {
			this.setState({ quiz: snapshot.val() })
		})
	}

	checkParticipant = () => {
		let { PSID } = this.props.userDetails
		firebaseApp
			.database()
			.ref(`participants/${PSID}`)
			.once('value', snapshot => {
				!snapshot.val() && this.assignParticipant()
			})
	}

	assignParticipant = () => {
		let { PSID, firstName, lastName, avatar } = this.props.userDetails
		let answerTemplate = Array(this.state.quiz.length).fill({
			ans: '',
			correct: false,
			at: 0
		})

		let tempParticipant = {
			point: 0,
			answerPack: answerTemplate,
			firstName,
			lastName,
			profilePic: avatar
		}
		firebaseApp.database().ref(`participants/${PSID}`).set(tempParticipant)
	}

	render() {
		return (
			<div className="row">
				<div className="col-12 text-center">
					<UserProfileCard userDetails={this.props.userDetails} />
					<SectionDivider />
				</div>

				<div className="col-12 text-center mt-4">
					{this.state.playing
						? <div className="row">
								<div className="col-12 text-center">
									<h4>กิจกรรมกำลังจะเริ่ม</h4>
									<h5 className="mb-3">คุณต้องการเข้าร่วมหรือไม่?</h5>
									<Link to="/quiz">
										<Button
											raised
											color="primary"
											style={styles.button}
											onClick={this.checkParticipant}
										>
											เข้าร่วม
										</Button>
									</Link>

									<Button raised color="default">
										ไม่เข้าร่วม
									</Button>
								</div>
							</div>
						: <h4>กิจกรรมยังไม่เริ่ม</h4>}
				</div>

				{this.props.userDetails.isAdmin &&
					<div className="col-12 text-center mt-4">
						<Link to="/admin">
							<Button raised color="accent">
								Admin
							</Button>
						</Link>
					</div>}
			</div>
		)
	}
}

export default Home
