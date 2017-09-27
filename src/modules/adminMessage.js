import keys from 'lodash/keys';
import { db } from '../utils/firebase';

// actions
const SELECTED_MESSAGE = 'adminMessage/SELECTED_MESSAGE';
const GET_MESSAGE_TYPE = 'adminMessage/GET_MESSAGE_TYPE';
const GET_ALL_MESSAGE = 'adminMessage/GET_ALL_MESSAGE';
const CREATE_NEW_MESSAGE = 'adminMessage/CREATE_NEW_MESSAGE';
const EDIT_MESSAGE = 'adminMessage/EDIT_MESSAGE';

// action creators
export const selectedMessage = message => ({ type: SELECTED_MESSAGE, message });
export const getMessageType = messageType => ({
  type: GET_MESSAGE_TYPE,
  messageType,
});
export const getAllMessage = messageList => ({
  type: GET_ALL_MESSAGE,
  messageList,
});
export const createNewMessage = creating => ({
  type: CREATE_NEW_MESSAGE,
  creating,
});
export const editMessage = editing => ({ type: EDIT_MESSAGE, editing });

// ajax
export const fetchMessageType = () => dispatch => {
  db.ref('messageTypes').on('value', snapshot => dispatch(getMessageType(snapshot.val())));
};

export const fetchAllMessage = () => dispatch => {
  db.ref('messageTemplates').on('value', snapshot => dispatch(getAllMessage(snapshot.val())));
};

// reducers
const adminMessageInitialState = {
  creating: false,
  editing: false,
  selected: {},
  typeCollection: [],
};

const adminMessage = (state = adminMessageInitialState, action) => {
  switch (action.type) {
    case GET_MESSAGE_TYPE:
      return {
        ...state,
        messageType: action.messageType,
        typeCollection: keys(action.messageType),
      };

    case GET_ALL_MESSAGE:
      return {
        ...state,
        allMessage: action.messageList,
      };

    case CREATE_NEW_MESSAGE:
      return {
        ...state,
        creating: action.creating,
        editing: false,
        selected: {},
      };

    case EDIT_MESSAGE:
      return {
        ...state,
        editing: action.editing,
      };

    case SELECTED_MESSAGE:
      return {
        ...state,
        creating: false,
        selected: {
          ...action.message,
        },
      };

    default:
      return state;
  }
};

export default adminMessage;
