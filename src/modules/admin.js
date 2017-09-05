import { firebaseApp } from '../utils/firebase'

// actions
const TOTAL_USER = 'admin/TOTAL_USER'

// action creators
export const totalUser = totalUser => ({ type: TOTAL_USER, totalUser })

// ajax
export const getTotalUser = () => dispatch => {
	firebaseApp
		.database()
		.ref('userIds')
		.on('value', snapshot => {
			console.log(snapshot.val())
		})
}

// reducers
export const admin = (state = {}, action) => {
	switch (action.type) {
		case TOTAL_USER:
			return {
				...state,
				totalUser: action.totalUser
			}

		default:
			return state
	}
}

export default admin
