import { firebaseApp } from '../utils/firebase'

// actions
const TOTAL_USER = 'admin/TOTAL_USER'
const TOTAL_COUPON = 'admin/TOTAL_COUPON'
const TOTAL_PARTICIPANT = 'admin/TOTAL_PARTICIPANT'

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

// reducers
export const admin = (state = {}, action) => {
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

		default:
			return state
	}
}

export default admin
