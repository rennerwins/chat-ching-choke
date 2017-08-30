import React, { Component } from 'react'
import { firebaseApp } from '../../utils/firebase'
import styled, { keyframes } from 'styled-components'
import * as api from '../../utils/api'
import _ from 'lodash'

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

const SmallAvatar = styled.img`
	width: 20px;
	height: 20px;
	opacity: 1;
	animation: ${fadeIn} 0.5s;
`

const ImageWrapper = styled.div`
	position: absolute;
	top: 1px;
	z-index: 2;
	max-width: 100%;
	margin: 0 auto;
`

const GridTable = styled.div`
	width: 30px;
	height: 30px;
	display: inline-block;
	text-align: center;
	font-size: 1em;
	background-image: linear-gradient(to right, grey 1px, transparent 1px),
		linear-gradient(to bottom, grey 1px, transparent 1px),
		linear-gradient(to left, grey 1px, transparent 1px),
		linear-gradient(to top, grey 1px, transparent 1px);
`

const GridWrapper = styled.div`
	position: absolute;
	max-width: 100%;
	margin: 0 auto;
`

const Span = styled.span`font-size: 10px;`

class AdminPrize extends Component {
	state = {
		users: [],
		num: 0,
		limit: 150,
		running: false,
		couponPair: '',
		totalCoupon: null,
		keys: [],
		fetchCount: null,
		index: 0,
		couponNumber: null,
		matchedUser: {},
		allUsers: []
	}

	componentDidMount() {
		// this.getCouponLength()
		// this.getAllUser()
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.index !== prevState.index) {
			this.runUsers()
		}
		if (this.state.keys[this.state.index + 1] == this.state.num) {
			setTimeout(() => {
				this.nextBatch()
			}, 1000)
		}
	}

	getCouponLength = () => {
		firebaseApp
			.database()
			.ref('couponPair')
			.once('value', snapshot => {
				let { limit } = this.state
				let totalCoupon = Object.keys(snapshot.val()).length
				let fetchCount = totalCoupon / limit
				let keys = []

				for (var i = 0; i < fetchCount; i++) {
					let key = Object.keys(snapshot.val())[i * limit]
					keys.push(key)
				}

				this.setState({
					totalCoupon,
					fetchCount,
					keys
				})

				if (keys.length > 0) {
					this.runUsers()
				}
			})
	}

	runUsers = () => {
		this.getUsers(this.state.keys[this.state.index])
	}

	nextBatch = () => {
		this.setState(prevState => ({
			index: prevState.index + 1
		}))
	}

	getUsers = userKey => {
		firebaseApp
			.database()
			.ref('couponPair')
			.limitToFirst(this.state.limit)
			.startAt(null, userKey)
			.once('value', snapshot => {
				let val = []
				if (Array.isArray(snapshot.val())) {
					snapshot.val().map(v => val.push(v))
				} else {
					_.values(snapshot.val()).map(v => val.push(v))
				}

				this.setState(prevState => ({
					users: [...prevState.users, ...val]
				}))

				this.interval = setInterval(() => this.tick(), 10)
			})
	}

	// getAllUser = () => {
	// 	firebaseApp
	// 		.database()
	// 		.ref('couponPair')
	// 		.once('value', snapshot => {
	// 			this.setState({ allUsers: snapshot.val() })
	// 		})
	// }

	tick = () => {
		if (this.state.users.length > 0) {
			if (this.state.num <= this.state.users.length) {
				this.setState(prevState => ({
					num: prevState.num + 1
				}))
			} else {
				clearInterval(this.interval)
			}
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	handleCouponPair = e => {
		let { value } = e.target
		this.setState({ couponPair: value })
	}

	checkCoupon = () => {
		const { couponPair } = this.state
		api.getCouponPair(couponPair).then(res => {
			const { couponNumber, matchedUser } = res
			this.setState({
				couponNumber,
				matchedUser
			})
		})
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-12">
						{this.state.num - 1}
						<button className="btn btn-primary" onClick={this.nextBatch}>
							Next
						</button>
						<button className="btn btn-info" onClick={this.getCouponLength}>
							Start
						</button>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<input
							type="number"
							value={this.state.couponPair}
							onChange={this.handleCouponPair}
						/>
						<button className="btn btn-primary" onClick={this.checkCoupon}>
							Check
						</button>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<ImageWrapper>
							{this.state.users.length > 0 &&
								this.state.users.map(
									(player, index) =>
										index <= this.state.num && (
											<SmallAvatar
												posX={index}
												src={player.profilePic}
												key={index}
											/>
										)
								)}
						</ImageWrapper>
					</div>
				</div>

				{/* <div className="row">
					<div className="col-12">
						<GridWrapper>
							{this.state.allUsers.map((player, index) => (
								<GridTable key={index}>
									<Span>{index}</Span>
								</GridTable>
							))}
						</GridWrapper>
					</div>
				</div> */}
			</div>
		)
	}
}

export default AdminPrize
