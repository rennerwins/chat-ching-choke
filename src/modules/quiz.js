import { firebaseApp } from '../utils/firebase'

// actions
const STORE_QUIZ = 'quiz/STORE_QUIZ'
const SELECTED_QUIZ = 'quiz/SELECTED_QUIZ'
const CREATE_NEW_QUIZ = 'quiz/CREATE_NEW_QUIZ'

// action creators
export const storeQuiz = quiz => ({ type: STORE_QUIZ, quiz })
export const selectedQuiz = (quiz, number) => ({
	type: SELECTED_QUIZ,
	quiz,
	number
})
export const createNewQuiz = creating => ({ type: CREATE_NEW_QUIZ, creating })

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
	quiz: [],
	selected: {},
	creating: false,
	editng: false
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
				creating: false
			}

		case CREATE_NEW_QUIZ:
			return {
				...state,
				creating: action.creating,
				selected: {}
			}

		default:
			return state
	}
}

export default quiz
