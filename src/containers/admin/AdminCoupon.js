import React, { Component } from 'react'
import Button from 'material-ui/Button'
import * as api from '../../utils/api'
import { firebaseApp } from '../../utils/firebase'

class AdminCoupon extends Component {
	state = {
		amount: 1,
		couponNumber: [],
		couponPair: ''
	}

	componentDidMount() {
		let storage = firebaseApp.storage().refFromURL('gs://codelab-a8367.appspot.com/profilePic/67.jpg').getDownloadURL().then(res => console.log(res))
		console.log(storage)
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
		return <div />
	}
}

export default AdminCoupon
