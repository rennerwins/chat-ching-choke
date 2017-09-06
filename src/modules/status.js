import { firebaseApp } from '../utils/firebase'

// actions
const PLAYING = 'status/PLAYING'
const CAN_ENTER = 'status/CAN_ENTER'

// action creators
export const isPlaying = status => ({ type: PLAYING, status })
export const canEnter = status => ({ type: CAN_ENTER, status })

// ajax
export const checkPlaying = () => dispatch => {
	firebaseApp
		.database()
		.ref('playing')
		.on('value', snapshot => {
			dispatch(isPlaying(snapshot.val()))
		})
}

export const checkCanEnter = () => dispatch => {
  firebaseApp.database().ref('canEnter').on('value', snapshot => {
    dispatch(canEnter(snapshot.val()))
  })
}

// reducers
const initialState = {
	playing: false,
	canEnter: false
}

export const status = (state = initialState, action) => {
	switch (action.type) {
		case PLAYING:
			return {
				...state,
				playing: action.status
      }
    
    case CAN_ENTER:
      return {
        ...state,
        canEnter: action.status
      }

		default:
			return state
	}
}

export default status
