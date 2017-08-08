import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserProfileCard from '../components/UserProfileCard'
import Button from 'material-ui/Button'
import { firebaseApp } from '../utils/firebase'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'

const styles = {
	button: {
		marginRight: '40px'
	}
}

class Home extends Component {
	static propTypes = {
		userDetails: PropTypes.object
	}

	state = {
		playing: false,
		deny: false,
		quiz: {},
		canEnter: false,
		isAdmin: false
	}

	componentDidMount() {
		firebaseApp.database().ref('playing').on('value', snapshot => {
			this.setState({ playing: snapshot.val() })
		})

		firebaseApp.database().ref('quiz').once('value', snapshot => {
			this.setState({ quiz: snapshot.val() })
		})

		firebaseApp.database().ref('canEnter').on('value', snapshot => {
			this.setState({ canEnter: snapshot.val() })
		})

		let admin = localStorage.isAdmin === 'true'

		this.setState({
			isAdmin: admin
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

	denyParticipation = () => {
		this.setState({ deny: true })
	}

	render() {
		return (
			<div className="row">
				<div className="col-12 col-md-6 offset-md-3 text-center">
					<Paper elevation={5}>
						<UserProfileCard userDetails={this.props.userDetails} />
					</Paper>
				</div>

				<div className="col-12 col-md-6 offset-md-3 text-center mt-4">
					{this.state.playing &&
					!this.state.deny &&
					!this.props.userDetails.cantPlay &&
					this.state.canEnter
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

									<Button
										onClick={this.denyParticipation}
										raised
										color="default"
									>
										ไม่เข้าร่วม
									</Button>
								</div>
							</div>
						: ''}
					{!this.state.playing &&
					!this.state.deny &&
					!this.props.userDetails.cantPlay
						? <h4>กิจกรรมยังไม่เริ่ม</h4>
						: ''}
					{this.state.deny && <h4>น่าเสียดายจัง ไว้โอกาสหน้านะ</h4>}
				</div>

				{this.props.userDetails.cantPlay &&
					<div className="col-12 text-center mt-4">
						<h4>
							รบกวนทักแชทที่{' '}
							<a
								href="https://m.me/dswhatever"
								target="_blank"
							>
								Facebook Messenger
							</a>{' '}
							เพื่อยืนยันตัวตน
						</h4>
					</div>}

				{localStorage.isAdmin &&
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
