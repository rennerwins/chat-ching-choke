import React, { Component } from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import * as api from '../../utils/api'
import UserWinner from '../../components/User/UserWinner'
import ReactCountdownClock from 'react-countdown-clock'

class AdminCoupon extends Component {
	state = {
		amount: 1,
		couponNumber: [],
		couponPair: '',
		firstPrize: false,
		matchedUser: [],
		start: false,
		error: '',
		complete: false
	}

	handleCouponPair = e => {
		let { value } = e.target
		this.setState({ couponPair: value })
	}

	handleAmount = e => {
		let { value } = e.target
		this.setState({ amount: value })
	}

	handleFirstPrize = e => {
		this.setState(prevState => ({ firstPrize: !prevState.firstPrize }))
	}

	startCountDown = () => {
		this.setState({ start: true })
	}

	clearAll = () => {
		this.setState({
			amount: 1,
			couponNumber: [],
			couponPair: '',
			firstPrize: false,
			matchedUser: [],
			start: false,
			error: '',
			complete: false
		})
	}

	checkCoupon = () => {
		const { couponPair, amount, matchedUser } = this.state

		if (amount > matchedUser.length) {
			api.getCouponPair(couponPair).then(res => {
				const { couponNumber, matchedUser } = res
				if (couponNumber) {
					this.setState(prevState => ({
						couponNumber: [...prevState.couponNumber, couponNumber],
						matchedUser: [...prevState.matchedUser, matchedUser],
						couponPair: ''
					}))
				}
			})
		}
	}

	countdownFinished = () => {
		this.setState({ complete: true })
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-12">
						<div className="row justify-content-center">
							{this.state.matchedUser.length > 0 &&
								this.state.matchedUser.map(
									(user, index) =>
										user && (
											<div className="col-md-auto text-center" key={index}>
												{this.state.firstPrize &&
												this.state.matchedUser.length > 0 && this.state.start && (
													!this.state.complete ? <ReactCountdownClock
														size={130}
														seconds={180}
														weight={10}
														paused={!this.state.start}
														color={'#0D47A1'}
														onComplete={() => this.countdownFinished()}
													/> : <ReactCountdownClock
														size={130}
														seconds={180}
														weight={10}
														paused={false}
														color={'#F44336'}
														pausedText="X"
													/>
												)}

												<UserWinner
													firstPrize={this.state.firstPrize}
													start={this.state.start}
													user={user}
													coupon={this.state.couponNumber[index]}
												/>
											</div>
										)
								)}
						</div>
					</div>
				</div>

				<div className="row align-items-center fixed-bottom">
					<div className="col-2 text-center">
						<FormControlLabel
							control={
								<Checkbox
									checked={this.state.firstPrize}
									onChange={this.handleFirstPrize}
								/>
							}
							label="1st Prize"
						/>
					</div>

					<div className="col-2 text-center">
						<TextField
							id="name"
							label="จำนวนคน"
							value={this.state.amount}
							onChange={this.handleAmount}
							margin="normal"
							type="number"
							min="1"
						/>
					</div>

					<div className="col text-center">
						<TextField
							id="name"
							label="เลขคูปอง"
							value={this.state.couponPair}
							placeholder="xxxx"
							onChange={this.handleCouponPair}
							margin="normal"
							type="number"
							min="1"
							className="mr-3"
						/>
						<Button raised color="primary" onClick={this.checkCoupon}>
							ตรวจสอบ
						</Button>
					</div>

					<div className="col-2 text-center">
						<Button
							raised
							color="accent"
							disabled={!this.state.firstPrize}
							onClick={this.startCountDown}
						>
							เริ่มจับเวลา
						</Button>
					</div>

					<div className="col-2 text-center">
						<Button raised color="accent" onClick={this.clearAll}>
							Clear
						</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default AdminCoupon
