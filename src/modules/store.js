import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import user from './user'
import quiz from './quiz'
import admin from './admin'
import status from './status'

const rootReducer = combineReducers({
	admin,
	user,
	quiz,
	status
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
)

export default store
