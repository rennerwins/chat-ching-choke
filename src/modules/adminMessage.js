const SELECTED_MESSAGE = 'adminMessage/SELECTED_MESSAGE'

export const selectedMessage = message => ({ type: SELECTED_MESSAGE, message })

const initialState = {
  creating: false,
  editing: false
}

export const adminMessage = (state = initialState, action) => {
  switch(action.type) {
    case SELECTED_MESSAGE:
      return {
        ...state,
        ...action.message
      }

    default:
      return initialState
  }
}

export default adminMessage
