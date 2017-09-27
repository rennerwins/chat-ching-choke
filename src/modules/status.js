import { db } from '../utils/firebase';

// actions
const IS_PLAYING = 'status/IS_PLAYING';
const CAN_ENTER = 'status/CAN_ENTER';

// action creators
export const isPlaying = playing => ({ type: IS_PLAYING, playing });
export const canEnter = entering => ({ type: CAN_ENTER, entering });

// ajax
export const checkPlaying = () => dispatch => {
  db.ref('playing').on('value', snapshot => {
    dispatch(isPlaying(snapshot.val()));
  });
};

export const checkCanEnter = () => dispatch => {
  db.ref('canEnter').on('value', snapshot => {
    dispatch(canEnter(snapshot.val()));
  });
};

// reducers
const initialState = {
  playing: false,
  canEnter: false,
};

const status = (state = initialState, action) => {
  switch (action.type) {
    case IS_PLAYING:
      return {
        ...state,
        playing: action.playing,
      };

    case CAN_ENTER:
      return {
        ...state,
        canEnter: action.entering,
      };

    default:
      return state;
  }
};

export default status;
