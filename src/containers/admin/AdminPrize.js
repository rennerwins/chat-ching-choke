import React, { Component } from 'react'
import { firebaseApp } from '../../utils/firebase'
import styled, { keyframes } from 'styled-components'
import * as api from '../../utils/api'
import _ from 'lodash'
import SmallAvatar from '../../components/Admin/SmallAvatar'
import GridTable from '../../components/Admin/GridTable'
import Button from 'material-ui/Button'

const ImageWrapper = styled.div`
	position: absolute;
	top: 1px;
	z-index: 2;
	max-width: 100%;
	margin: 0 auto;
`

const GridWrapper = styled.div`
	position: absolute;
	max-width: 100%;
	margin: 0 auto;
`

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
		allUsers: [],
		ticking: 800,
		increment: 10,
		clicked: false
	}

	componentDidMount() {
		this.getCouponLength()
		this.getAllUser()
	}

	componentDidUpdate(prevProps, prevState) {
		let { index, keys, num } = this.state
		index !== prevState.index && this.runUsers()
		keys[index + 1] < num && setTimeout(() => this.nextBatch(), 1500)
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

				// if (keys.length > 0) {
				// 	this.runUsers()
				// }
			})
	}

	runUsers = () => {
		const { keys } = this.state
		keys.length > 0 && this.getUsers(this.state.keys[this.state.index])
		this.setState({
			clicked: true
		})
	}

	nextBatch = () => {
		this.setState(prevState => ({ index: prevState.index + 1 }))
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

				this.interval = setInterval(() => this.tick(), this.state.ticking)
			})
	}

	getUserAvatar = num => {
		firebaseApp
			.storage()
			.refFromURL(`gs://codelab-a8367.appspot.com/profilePic/${num + 1}.jpg`)
			.getDownloadURL()
			.then(res => {
				console.log('res', res)
				this.setState(prevState => ({
					users: [...prevState.users, res]
				}))
			})

		this.interval = setInterval(() => this.tick(), this.state.ticking)
	}

	getAllUser = () => {
		firebaseApp
			.database()
			.ref('couponPair')
			.once('value', snapshot => this.setState({ allUsers: snapshot.val() }))
	}

	tick = () => {
		let { users, num, increment } = this.state

		if (users.length > 0) {
			num <= users.length
				? this.setState(prevState => ({ num: prevState.num + increment }))
				: clearInterval(this.interval)
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
					<div className="col-12 text-center">
						<h1>จำนวนคูปองทั้งหมด {this.state.totalCoupon}</h1>
						<Button
							hidden={this.state.clicked}
							raised
							color="primary"
							onClick={this.runUsers}
						>
							เริ่มส่งคูปอง
						</Button>
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
											<SmallAvatar src={player.profilePic} key={index} />
										)
								)}
						</ImageWrapper>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<GridWrapper>
							{this.state.allUsers.map((player, index) => (
								<GridTable key={index} num={index} />
							))}
						</GridWrapper>
					</div>
				</div>
			</div>
		)
	}
}

export default AdminPrize
