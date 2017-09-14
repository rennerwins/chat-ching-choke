import { firebaseApp } from '../utils/firebase'
import _ from 'lodash'

// actions
const TOTAL_USER = 'admin/TOTAL_USER'
const TOTAL_COUPON = 'admin/TOTAL_COUPON'
const TOTAL_PARTICIPANT = 'admin/TOTAL_PARTICIPANT'
const SHOW_LATEST_USERS = 'admin/SHOW_LATEST_USERS'

// action creators
export const totalUsers = users => ({ type: TOTAL_USER, users })
export const totalCoupon = coupons => ({
	type: TOTAL_COUPON,
	coupons
})
export const totalParticipant = participants => ({
	type: TOTAL_PARTICIPANT,
	participants
})
export const showLatestUsers = users => ({ type: SHOW_LATEST_USERS, users })

// ajax
export const getTotalUser = () => dispatch => {
	firebaseApp
		.database()
		.ref('userIds')
		.on('value', snapshot => {
			let users = Object.keys(snapshot.val()).length
			dispatch(totalUsers(users))
		})
}

export const getTotalCoupon = () => dispatch => {
	firebaseApp
		.database()
		.ref('couponPair')
		.on('value', snapshot => {
			let coupons = snapshot.val().length
			dispatch(totalCoupon(coupons))
		})
}

export const getTotalParticipant = () => dispatch => {
	firebaseApp
		.database()
		.ref('participants')
		.on('value', snapshot => {
			if (snapshot.val()) {
				let participants = Object.keys(snapshot.val()).length
				dispatch(totalParticipant(participants))
			}
		})
}

export const getLatestUsers = amount => dispatch => {
	firebaseApp
		.database()
		.ref('users')
		.limitToLast(amount)
		.on('value', snapshot => {
			dispatch(showLatestUsers(snapshot.val()))
		})
}

// reducers
const initialState = {
	latestUsers: []
}

const admin = (state = initialState, action) => {
	switch (action.type) {
		case TOTAL_USER:
			return {
				...state,
				totalUsers: action.users
			}

		case TOTAL_COUPON:
			return {
				...state,
				totalCoupons: action.coupons
			}

		case TOTAL_PARTICIPANT:
			return {
				...state,
				totalParticipants: action.participants
			}

		case SHOW_LATEST_USERS:
			let newUsers = _.values(action.users)
			return {
				...state,
				latestUsers: newUsers
			}

		default:
			return state
	}
}

export default admin
