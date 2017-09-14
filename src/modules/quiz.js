import { firebaseApp } from '../utils/firebase'

// actions
const STORE_QUIZ = 'quiz/STORE_QUIZ'

// action creators
export const storeQuiz = quiz => ({ type: STORE_QUIZ, quiz })

// ajax
export const fetchQuiz = () => dispatch => {
	firebaseApp.database().ref('quiz').on('value', snapshot => {
		dispatch(storeQuiz(snapshot.val()))
	})
}

// reducers
const quiz = (state = {}, action) => {
	switch (action.type) {
		case STORE_QUIZ:
			return action.quiz

		default:
			return state
	}
}


export default quiz
