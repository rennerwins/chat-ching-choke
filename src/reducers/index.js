import { STORE_USER, REMOVE_USER } from '../actions'

const rootReducer = (state = {}, action) => {
	switch (action.type) {
		case STORE_USER:
			let userDetails = { ...state, ...action.userDetails }
			return userDetails

		default:
			return state
	}
}

export default rootReducer
