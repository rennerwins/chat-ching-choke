import React, { Component } from 'react'
import UserProfileCard from '../components/User/UserProfileCard'
import PlayingStatus from '../components/PlayingStatus'
import WarningMessage from '../components/WarningMessage'
import PlayingOptions from '../components/Home/PlayingOptions'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import { checkParticipant, getUserCoupon } from '../modules/user'
import { checkPlaying, checkCanEnter } from '../modules/status'

class Home extends Component {
	state = {
		deny: false
	}

	componentDidMount() {
		this.props.checkPlaying()
		this.props.checkCanEnter()
	}

	acceptParticipation = () => {
		const { user, quiz } = this.props
		this.props.checkParticipant(user, quiz)
	}

	denyParticipation = () => {
		this.setState({ deny: true })
	}

	render() {
		const { canEnter, playing } = this.props.status
		const { deny } = this.state
		const { user } = this.props

		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center">
						<Paper elevation={5}>
							<UserProfileCard user={user} />
						</Paper>
					</div>

					<div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center mt-4">
						<PlayingStatus canEnter={canEnter} playing={playing} />

						{!deny &&
						user.canPlay && (
							<div className="row">
								<div className="col-12 text-center">
									{canEnter && (
										<PlayingOptions
											accept={this.acceptParticipation}
											deny={this.denyParticipation}
										/>
									)}
								</div>
							</div>
						)}

						{deny && <h4>น่าเสียดายจัง ไว้โอกาสหน้านะ</h4>}
					</div>

					{!user.canPlay && <WarningMessage />}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(mapStateToProps, {
	checkParticipant,
	getUserCoupon,
	checkPlaying,
	checkCanEnter
})(Home)
