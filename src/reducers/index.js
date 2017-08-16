import { STORE_USER, REMOVE_USER } from '../actions'

const userInitialDetails = {
	userDetails: {
		displayName: '',
		email: '',
		avatar: '',
		uid: '',
		fbid: '',
		PSID: '',
		firstName: '',
		lastName: '',
		coupon: 0,
		canPlay: false,
		isAdmin: false,
		isLogin: false
	}
}

const rootReducer = (state = userInitialDetails, action) => {
	switch (action.type) {
		case STORE_USER:
			return {
				...state,
				userDetails: {
					...state.userDetails,
					...action.userDetails
				}
			}

		case REMOVE_USER:
			return userInitialDetails

		default:
			return state
	}
}

export default rootReducer
