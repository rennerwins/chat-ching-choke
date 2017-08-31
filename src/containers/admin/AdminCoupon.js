import React, { Component } from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import * as api from '../../utils/api'
import { firebaseApp } from '../../utils/firebase'
import styled from 'styled-components'
import UserWinner from '../../components/User/UserWinner'
import Countdown from 'react-countdown-now'

const WinnerWrapper = styled.div`width: 100%;`

class AdminCoupon extends Component {
	state = {
		amount: 1,
		couponNumber: [],
		couponPair: '',
		firstPrize: false,
		timer: 299,
		matchedUser: []
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
			api
				.getCouponPair(couponPair)
				.then(res => {
					const { couponNumber, matchedUser } = res
					this.setState(prevState => ({
						couponNumber: [...prevState.couponNumber, couponNumber],
						matchedUser: [...prevState.matchedUser, matchedUser]
					}))
				})
				.then(() => {
					this.setState({
						couponPair: ''
					})
				})
		}
	}

  renderer = ({ minutes, seconds }) => {
    return <h3>{minutes}:{seconds}</h3>
  }

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-12">
						{this.state.firstPrize &&
						this.state.matchedUser.length > 0 && (
							<Countdown
								renderer={this.renderer}
								date={Date.now() + 300000}
							/>
						)}

						<WinnerWrapper>
							{this.state.matchedUser.length > 0 &&
								this.state.matchedUser.map((user, index) => (
									<UserWinner
										key={index}
										user={user}
										coupon={this.state.couponNumber[index]}
									/>
								))}
						</WinnerWrapper>
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