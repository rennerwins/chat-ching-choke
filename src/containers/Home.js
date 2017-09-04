import React, { Component } from 'react'
import UserProfileCard from '../components/User/UserProfileCard'
import PlayingStatus from '../components/PlayingStatus'
import WarningMessage from '../components/WarningMessage'
import SharePostDialog from '../components/Home/SharePostDialog'
import FacebookPost from '../components/Home/FacebookPost'
import Button from 'material-ui/Button'
import { firebaseApp } from '../utils/firebase'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import { fetchQuiz, checkParticipant, getUserCoupon } from '../actions'
import * as api from '../utils/api'

const styles = {
	button: {
		marginRight: '40px'
	}
}

class Home extends Component {
	state = {
		playing: false,
		deny: false,
		canEnter: false,
		testing: false,
		tester: false,
		openDialog: false,
		couponIsAdded: false
	}

	componentDidMount() {
		this.props.fetchQuiz()

		firebaseApp
			.database()
			.ref('playing')
			.on('value', snapshot => {
				snapshot.val() && this.setState({ playing: snapshot.val() })
			})

		firebaseApp
			.database()
			.ref('canEnter')
			.on('value', snapshot => {
				snapshot.val() && this.setState({ canEnter: snapshot.val() })
			})

		firebaseApp
			.database()
			.ref('testing')
			.on('value', snapshot => {
				snapshot.val() && this.setState({ testing: snapshot.val() })
			})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.testing === true) {
			this.getTester()
		}
	}

	getTester = () => {
		if (this.props.user.PSID) {
			firebaseApp
				.database()
				.ref(`tester/${this.props.user.PSID}`)
				.once('value', snapshot => {
					snapshot.val()
						? this.setState({ tester: snapshot.val() })
						: this.setState({ tester: snapshot.val() })
				})
		}
	}

	acceptParticipation = () => {
		const { user, quiz } = this.props
		this.props.checkParticipant(user, quiz)
	}

	denyParticipation = () => {
		this.setState({ deny: true })
	}

	handleSharePost = () => {
		const { fbid } = this.props.user
		if (fbid) {
			api.checkUserSharedPost(fbid).then(res => {
				const { error, couponIsAdded, couponNum } = res
				if (error === null) {
					couponIsAdded
						? this.setState({ couponIsAdded: true })
						: this.setState({ couponIsAdded: false })

					this.props.getUserCoupon(couponNum)
				} else {
					this.setState({ error })
				}
				this.setState({ openDialog: true })
			})
		}
	}

	handleRequestClose = () => {
		this.setState({ openDialog: false })
	}

	render() {
		return (
			<div className="row">
				<div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center">
					<Paper elevation={5}>
						<UserProfileCard user={this.props.user} />
					</Paper>
				</div>

				<div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center mt-4">
					<PlayingStatus
						canEnter={this.state.canEnter}
						playing={this.state.playing}
					/>

					{!this.state.deny &&
					this.props.user.canPlay && (
						<div className="row">
							<div className="col-12 text-center">
								{this.state.canEnter && (
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
									</div>
								)}
							</div>
						</div>
					)}

					{this.state.deny && <h4>น่าเสียดายจัง ไว้โอกาสหน้านะ</h4>}
				</div>

				{!this.props.user.canPlay && <WarningMessage />}

				{localStorage.isAdmin && (
					<div className="col-12 text-center mt-4">
						<Link to="/admin">
							<Button raised color="accent">
								Admin
							</Button>
						</Link>
					</div>
				)}

				<div className="col-12 text-center mt-4">
					<FacebookPost />
				</div>

				<div className="col-12 text-center mt-4">
					<Button raised color="primary" onClick={this.handleSharePost}>
						Test Share Feature
					</Button>

					<SharePostDialog
						error={this.state.error}
						couponIsAdded={this.state.couponIsAdded}
						open={this.state.openDialog}
						close={this.handleRequestClose}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(mapStateToProps, { fetchQuiz, checkParticipant, getUserCoupon })(Home)
