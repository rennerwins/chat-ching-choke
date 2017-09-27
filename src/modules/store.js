import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import user from './user';
import quiz from './quiz';
import admin from './admin';
import status from './status';
import adminMessage from './adminMessage';

const rootReducer = combineReducers({
  admin,
  user,
  quiz,
  status,
  adminMessage,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
