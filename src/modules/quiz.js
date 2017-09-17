import { firebaseApp } from '../utils/firebase'

// actions
const STORE_QUIZ = 'quiz/STORE_QUIZ'
const SELECTED_QUIZ = 'quiz/SELECTED_QUIZ'
const CREATE_NEW_QUIZ = 'quiz/CREATE_NEW_QUIZ'
const EDIT_QUIZ = 'quiz/EDIT_QUIZ'

// action creators
export const storeQuiz = quiz => ({ type: STORE_QUIZ, quiz })
export const selectedQuiz = (quiz, number) => ({
	type: SELECTED_QUIZ,
	quiz,
	number
})
export const createNewQuiz = creating => ({ type: CREATE_NEW_QUIZ, creating })
export const editQuiz = editing => ({ type: EDIT_QUIZ, editing })

// ajax
export const fetchQuiz = () => dispatch => {
	firebaseApp
		.database()
		.ref('quiz')
		.on('value', snapshot => {
			dispatch(storeQuiz(snapshot.val()))
		})
}

// reducers
const quizInitialState = {
	selected: {},
	creating: false,
	editing: false,
	quizList: []
}

const quiz = (state = quizInitialState, action) => {
	switch (action.type) {
		case STORE_QUIZ:
			return {
				...state,
				quizList: action.quiz
			}

		case SELECTED_QUIZ:
			return {
				...state,
				selected: {
					...action.quiz,
					num: action.number
				},
				creating: false,
				editing: false
			}

		case CREATE_NEW_QUIZ:
			return {
				...state,
				creating: action.creating,
				selected: {},
				editing: false
			}

		case EDIT_QUIZ:
			return {
				...state,
				creating: false,
				editing: action.editing
			}

		default:
			return state
	}
}

export default quiz
