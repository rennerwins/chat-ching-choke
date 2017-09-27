import * as api from '../utils/api';
import { db, auth, facebookProvider } from '../utils/firebase';

// actions
const STORE_USER = 'user/STORE_USER';
const REMOVE_USER = 'user/REMOVE_USER';
const GET_USER_COUPON = 'user/GET_USER_COUPON';

// action creators
export const storeUser = userDetails => ({ type: STORE_USER, userDetails });
export const removeUser = () => ({ type: REMOVE_USER });
export const getUserCoupon = coupon => ({ type: GET_USER_COUPON, coupon });

// ajax
export const checkAdmin = firebaseID => dispatch => {
  db.ref(`webAdmin/${firebaseID}`).once('value', snapshot => {
    if (snapshot.val()) {
      dispatch(storeUser({ isAdmin: true }));
      localStorage.setItem('isAdmin', true);
    } else {
      dispatch(storeUser({ isAdmin: false }));
      localStorage.removeItem('isAdmin');
    }
  });
};

export const addNewUserFromWeb = (facebookID, firebaseID) => async dispatch => {
  const res = await api.addNewUserFromWeb(facebookID, firebaseID);
  const { PSID, firstName, lastName, coupon } = await res;

  if (res.errorCode === 555) {
    dispatch({ canPlay: false });
  } else {
    dispatch(
      storeUser({
        PSID,
        firstName,
        lastName,
        coupon,
        canPlay: true,
        loading: false,
      })
    );
  }
};

export const getUserDetails = () => dispatch => {
  auth.onAuthStateChanged(userDetail => {
    if (userDetail) {
      const { displayName, email, photoURL, uid } = userDetail.providerData[0];
      dispatch(
        storeUser({
          isLogin: true,
          displayName,
          email,
          avatar: photoURL,
          fbid: uid,
          uid: userDetail.uid,
        })
      );
      dispatch(checkAdmin(userDetail.uid));
      dispatch(addNewUserFromWeb(uid, userDetail.uid));
      localStorage.setItem('isLogin', true);
    }
  });
};

export const facebookLogin = () => dispatch => {
  facebookProvider.addScope('user_posts');
  auth.signInWithPopup(facebookProvider).then(res => {
    if (res) {
      dispatch(storeUser({ isLogin: true }));
      localStorage.setItem('isLogin', true);
    }
  });
};

export const logout = () => dispatch => {
  window.location.reload();
  auth.signOut().then(() => {
    dispatch(removeUser());
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLogin');
  });
};

export const assignParticipant = (userDetail, quizLength) => {
  const { PSID, firstName, lastName, avatar } = userDetail;

  const answerTemplate = Array(quizLength).fill({
    ans: '',
    correct: false,
    at: 0,
  });

  const tempParticipant = {
    point: 0,
    answerPack: answerTemplate,
    firstName,
    lastName,
    profilePic: avatar,
  };

  db.ref(`participants/${PSID}`).set(tempParticipant);
};

export const checkParticipant = (userDetail, quiz) => dispatch => {
  const { PSID } = userDetail;
  db.ref(`/participants/${PSID}`).once('value', snapshot => {
    if (!snapshot.val) {
      dispatch(assignParticipant(userDetail, quiz.quizList.length));
    }
  });
};

// reducers
const userInitialDetails = {
  loading: true,
  displayName: '',
  email: '',
  avatar: '',
  uid: '',
  fbid: '',
  PSID: '',
  firstName: '',
  lastName: '',
  coupon: 0,
  canPlay: false,
  isAdmin: false,
  isLogin: false,
};

const user = (state = userInitialDetails, action) => {
  switch (action.type) {
    case STORE_USER:
      return {
        ...state,
        ...action.userDetails,
      };

    case GET_USER_COUPON:
      return {
        ...state,
        coupon: action.coupon,
      };

    case REMOVE_USER:
      return userInitialDetails;

    default:
      return state;
  }
};

export default user;
