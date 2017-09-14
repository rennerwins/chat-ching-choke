import { firebaseApp } from '../utils/firebase'
import _ from 'lodash'

// actions
const SELECTED_MESSAGE = 'adminMessage/SELECTED_MESSAGE'
const GET_MESSAGE_TYPE = 'adminMessage/GET_MESSAGE_TYPE'
const GET_MESSAGE = 'adminMessage/GET_MESSAGE'

// action creators
export const selectedMessage = message => ({ type: SELECTED_MESSAGE, message })
export const getMessageType = messageType => ({
	type: GET_MESSAGE_TYPE,
	messageType
})

// ajax
export const fetchMessageType = () => dispatch => {
	firebaseApp
		.database()
		.ref('messageTypes')
		.on('value', snapshot => dispatch(getMessageType(snapshot.val())))
}
export const fetchMessageList = messageType => dispatch => {
	firebaseApp.database().ref(`messageTypes/${messageType}`).on('value', snapshot => {
		console.log(snapshot.val())
	})
}


// reducers
const adminMessage = (state = {}, action) => {
	switch (action.type) {
		case GET_MESSAGE_TYPE:
			return {
				...state,
				messageType: action.messageType
			}

		case SELECTED_MESSAGE:
			return {
				...state,
				selected: {
					...action.message
				}
			}

		default:
			return state
	}
}

export default adminMessage
