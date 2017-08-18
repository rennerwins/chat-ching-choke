import { combineReducers } from 'redux'
import { STORE_USER, REMOVE_USER, STORE_QUIZ } from '../actions'

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

const rootReducer = combineReducers({
	user,
	quiz
})

export default rootReducer
