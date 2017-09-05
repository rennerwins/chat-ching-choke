import { firebaseApp } from '../utils/firebase'

// actions
const TOTAL_USER = 'admin/TOTAL_USER'
const TOTAL_COUPON = 'admin/TOTAL_COUPON'

// action creators
export const totalUsers = users => ({ type: TOTAL_USER, users })
export const totalCoupon = coupons => ({
	type: TOTAL_COUPON,
	coupons
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

		default:
			return state
	}
}

export default admin
