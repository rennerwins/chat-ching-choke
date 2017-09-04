import { combineReducers } from 'redux'
import {
	STORE_USER,
	REMOVE_USER,
	STORE_QUIZ,
	STORE_TOTAL_COUPON,
	GET_USER_COUPON
} from '../actions'

const userInitialDetails = {
	displayName: '',
	email: '',
	avatar: '',
	uid: '',
	fbid: '',
	PSID: '',
	firstName: '',
	lastName: '',
	coupon: 0,
	canPlay: true,
	isAdmin: false,
	isLogin: false
}

export const user = (state = userInitialDetails, action) => {
	switch (action.type) {
		case STORE_USER:
			return {
				...state,
				...action.userDetails
			}

		case GET_USER_COUPON:
			return {
				...state,
				coupon: action.coupon
			}

		case REMOVE_USER:
			return userInitialDetails

		default:
			return state
	}
}

export const quiz = (state = {}, action) => {
	switch (action.type) {
		case STORE_QUIZ:
			return action.quiz

		default:
			return state
	}
}

export const coupon = (state = {}, action) => {
	switch (action.type) {
		case STORE_TOTAL_COUPON:
			return {
				totalCoupon: action.totalCoupon
			}

		default:
			return state
	}
}

const rootReducer = combineReducers({
	user,
	quiz,
	coupon
})

export default rootReducer
