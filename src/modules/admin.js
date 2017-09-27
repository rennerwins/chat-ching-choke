import values from 'lodash/values';
import keys from 'lodash/keys';
import { db } from '../utils/firebase';

// actions
const TOTAL_USER = 'admin/TOTAL_USER';
const TOTAL_COUPON = 'admin/TOTAL_COUPON';
const TOTAL_PARTICIPANT = 'admin/TOTAL_PARTICIPANT';
const SHOW_LATEST_USERS = 'admin/SHOW_LATEST_USERS';

// action creators
export const totalUsers = users => ({ type: TOTAL_USER, users });
export const totalCoupon = coupons => ({
  type: TOTAL_COUPON,
  coupons,
});
export const totalParticipant = participants => ({
  type: TOTAL_PARTICIPANT,
  participants,
});
export const showLatestUsers = users => ({ type: SHOW_LATEST_USERS, users });

// ajax
export const getTotalUser = () => dispatch => {
  db.ref('userIds').on('value', snapshot => {
    const users = keys(snapshot.val()).length;
    dispatch(totalUsers(users));
  });
};

export const getTotalCoupon = () => dispatch => {
  db.ref('couponPair').on('value', snapshot => {
    if (snapshot.val()) {
      const coupons = snapshot.val().length;
      dispatch(totalCoupon(coupons));
    }
  });
};

export const getTotalParticipant = () => dispatch => {
  db.ref('participants').on('value', snapshot => {
    if (snapshot.val()) {
      const participants = keys(snapshot.val()).length;
      dispatch(totalParticipant(participants));
    }
  });
};

export const getLatestUsers = amount => dispatch => {
  db
    .ref('users')
    .limitToLast(amount)
    .on('value', snapshot => {
      dispatch(showLatestUsers(snapshot.val()));
    });
};

// reducers
const initialState = {
  latestUsers: [],
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case TOTAL_USER:
      return {
        ...state,
        totalUsers: action.users,
      };

    case TOTAL_COUPON:
      return {
        ...state,
        totalCoupons: action.coupons,
      };

    case TOTAL_PARTICIPANT:
      return {
        ...state,
        totalParticipants: action.participants,
      };

    case SHOW_LATEST_USERS:
      return {
        ...state,
        latestUsers: values(action.users),
      };

    default:
      return state;
  }
};

export default admin;
