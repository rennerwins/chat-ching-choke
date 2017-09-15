import { firebaseApp } from '../utils/firebase'

// actions
const SELECTED_MESSAGE = 'adminMessage/SELECTED_MESSAGE'
const GET_MESSAGE_TYPE = 'adminMessage/GET_MESSAGE_TYPE'
const GET_ALL_MESSAGE = 'adminMessage/GET_ALL_MESSAGE'

// action creators
export const selectedMessage = message => ({ type: SELECTED_MESSAGE, message })
export const getMessageType = messageType => ({
	type: GET_MESSAGE_TYPE,
	messageType
})
export const getAllMessage = messageList => ({
	type: GET_ALL_MESSAGE,
	messageList
})

// ajax
export const fetchMessageType = () => dispatch => {
	firebaseApp
		.database()
		.ref('messageTypes')
		.on('value', snapshot => dispatch(getMessageType(snapshot.val())))
}

export const fetchAllMessage = () => dispatch => {
	firebaseApp
		.database()
		.ref('messageTemplates')
		.on('value', snapshot => dispatch(getAllMessage(snapshot.val())))
}

// export const fetchMessageList = messageType => dispatch => {
// 	firebaseApp.database().ref(`messageTypes/${messageType}`).on('value', snapshot => {
// 		dispatch(getMessageList(messageType, snapshot.val()))
// 	})
// }

// reducers
const adminMessage = (state = {}, action) => {
	switch (action.type) {
		case GET_MESSAGE_TYPE:
			return {
				...state,
				messageType: action.messageType
			}

		case GET_ALL_MESSAGE:
			return {
				...state,
				allMessage: action.messageList
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
