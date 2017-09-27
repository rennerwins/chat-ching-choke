import { db } from '../utils/firebase';

// actions
const STORE_QUIZ = 'quiz/STORE_QUIZ';
const SELECTED_QUIZ = 'quiz/SELECTED_QUIZ';
const CREATE_NEW_QUIZ = 'quiz/CREATE_NEW_QUIZ';
const EDIT_QUIZ = 'quiz/EDIT_QUIZ';
const DELETE_QUIZ = 'quiz/DELETE_ALL_QUIZ';

// action creators
export const storeQuiz = quizes => ({ type: STORE_QUIZ, quizes });
export const selectedQuiz = (selectQuiz, number) => ({
  type: SELECTED_QUIZ,
  selectQuiz,
  number,
});
export const createNewQuiz = creating => ({ type: CREATE_NEW_QUIZ, creating });
export const editQuiz = editing => ({ type: EDIT_QUIZ, editing });
export const deleteQuiz = () => ({ type: DELETE_QUIZ });

// ajax
export const fetchQuiz = () => dispatch => {
  db.ref('quiz').on('value', snapshot => {
    dispatch(storeQuiz(snapshot.val()));
  });
};
export const deleteAllQuiz = () => dispatch => {
  db.ref('quiz').remove();
  dispatch(deleteQuiz());
};

// reducers
const quizInitialState = {
  selected: {},
  creating: false,
  editing: false,
  quizList: [],
};

const quiz = (state = quizInitialState, action) => {
  switch (action.type) {
    case STORE_QUIZ:
      return {
        ...state,
        quizList: action.quiz,
      };

    case SELECTED_QUIZ:
      return {
        ...state,
        selected: {
          ...action.quiz,
          num: action.number,
        },
        creating: false,
        editing: false,
      };

    case CREATE_NEW_QUIZ:
      return {
        ...state,
        creating: action.creating,
        selected: {},
        editing: false,
      };

    case EDIT_QUIZ:
      return {
        ...state,
        creating: false,
        editing: action.editing,
      };

    case DELETE_QUIZ:
      return quizInitialState;

    default:
      return state;
  }
};

export default quiz;
