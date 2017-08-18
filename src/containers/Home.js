import React, { Component } from 'react'
import UserProfileCard from '../components/UserProfileCard'
import Button from 'material-ui/Button'
import { firebaseApp } from '../utils/firebase'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import { fetchQuiz, checkParticipant } from '../actions'

const styles = {
	button: {
		marginRight: '40px'
	}
}

class Home extends Component {
	state = {
		playing: false,
		deny: false,
		canEnter: false
	}

	componentDidMount() {
		this.props.fetchQuiz()

		firebaseApp.database().ref('playing').on('value', snapshot => {
			this.setState({ playing: snapshot.val() })
		})

		firebaseApp.database().ref('canEnter').on('value', snapshot => {
			this.setState({ canEnter: snapshot.val() })
		})
	}

	acceptParticipation = () => {
		const { user, quiz } = this.props
		this.props.checkParticipant(user, quiz)
	}

	denyParticipation = () => {
		this.setState({ deny: true })
	}

	render() {
		return (
			<div className="row">
				<div className="col-12 col-md-6 offset-md-3 text-center">
					<Paper elevation={5}>
						<UserProfileCard user={this.props.user} />
					</Paper>
				</div>

				<div className="col-12 col-md-6 offset-md-3 text-center mt-4">
					{!this.state.canEnter &&
						!this.state.playing &&
						<h4>กิจกรรมยังไม่เริ่ม</h4>}
					{!this.state.deny && this.props.user.canPlay
						? <div className="row">
								<div className="col-12 text-center">
									{this.state.canEnter && !this.state.playing
										? <h4>กิจกรรมกำลังจะเริ่ม</h4>
										: <h4>กิจกรรมเริ่มแล้ว</h4>}

									{this.state.canEnter &&
										<div>
											<h5 className="mb-3">คุณต้องการเข้าร่วมหรือไม่?</h5>

											<Link to="/quiz">
												<Button
													raised
													color="primary"
													style={styles.button}
													onClick={this.acceptParticipation}
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
										</div>}
								</div>
							</div>
						: ''}

					{this.state.deny && <h4>น่าเสียดายจัง ไว้โอกาสหน้านะ</h4>}
				</div>

				{!this.props.user.canPlay &&
					<div className="col-12 text-center mt-4">
						<h4>
							รบกวนทักแชทที่{' '}
							<a
								href="https://m.me/dswhatever"
								target="_blank"
								rel="noopener noreferrer"
							>
								Facebook Messenger
							</a>{' '}
							เพื่อยืนยันตัวตน
						</h4>
					</div>}

				{this.props.user.isAdmin &&
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

const mapStateToProps = state => {
	return state
}

export default connect(mapStateToProps, { fetchQuiz, checkParticipant })(Home)
