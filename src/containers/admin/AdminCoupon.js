import React, { Component } from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import * as api from '../../utils/api'
import UserWinner from '../../components/User/UserWinner'
import Countdown from 'react-countdown-now'

class AdminCoupon extends Component {
	state = {
		amount: 1,
		couponNumber: [],
		couponPair: '',
		firstPrize: false,
		matchedUser: [],
		start: false,
		error: ''
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
			timer: 300,
			matchedUser: []
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

	renderer = ({ minutes, seconds, completed }) => {
		if (completed) {
			return <h1 className="animated flipInX">หมดเวลา</h1>
		} else {
			return (
				<h1>
					{minutes} : {seconds}
				</h1>
			)
		}
	}

	render() {
		return (
			<div>
				<div className="row">
					{this.state.firstPrize &&
					this.state.matchedUser.length > 0 && (
						<div className="col-12 text-center">
							{this.state.start ? (
								<Countdown
									renderer={this.renderer}
									date={Date.now() + 299000}
								/>
							) : (
								<h1>5 : 00</h1>
							)}
						</div>
					)}

					<div className="col-12">
						<div className="row justify-content-center">
							{this.state.matchedUser.length > 0 &&
								this.state.matchedUser.map(
									(user, index) =>
										user && (
											<div className="col-md-auto text-center" key={index}>
												<UserWinner
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
