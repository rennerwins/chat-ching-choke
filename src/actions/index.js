import * as api from '../utils/api'
import { firebaseApp, facebookProvider } from '../utils/firebase'

export const STORE_USER = 'STORE_USER'
export const REMOVE_USER = 'REMOVE_USER'

export const storeUser = userDetails => {
	return {
		type: STORE_USER,
		userDetails
	}
}

export const getUserDetail = () => dispatch => {
	firebaseApp.auth().onAuthStateChanged(user => {
		if (user) {
			let { displayName, email, photoURL, uid } = user.providerData[0]

			dispatch(
				storeUser({
					isLogin: true,
					displayName,
					email,
					avatar: photoURL,
					fbid: uid,
					uid: user.uid
				})
			)
			dispatch(checkAdmin(user.uid))
			dispatch(addNewUserFromWeb(uid, user.uid))
			localStorage.setItem('isLogin', true)
		}
	})
}

export const checkAdmin = firebaseID => dispatch => {
	firebaseApp
		.database()
		.ref(`webAdmin/${firebaseID}`)
		.once('value', snapshot => {
			if (snapshot.val()) {
				dispatch(storeUser({ isAdmin: true }))
				localStorage.setItem('isAdmin', true)
			} else {
				dispatch(storeUser({ isAdmin: false }))
				localStorage.removeItem('isAdmin')
			}
		})
}

export const addNewUserFromWeb = (facebookID, firebaseID) => dispatch => {
	api.addNewUserFromWeb(facebookID, firebaseID).then(res => {
		if (res.error_code === 555) {
			dispatch(storeUser({ canPlay: false }))
		} else {
			let { PSID, firstName, lastName, coupon } = res
			dispatch(
				storeUser({
					PSID,
					firstName,
					lastName,
					coupon,
					canPlay: true
				})
			)
		}
	})
}

export const facebookLogin = () => dispatch => {
	facebookProvider.addScope('user_posts')
	firebaseApp.auth().signInWithPopup(facebookProvider).then(res => {
		if (res) {
			dispatch(storeUser({ isLogin: true }))
			localStorage.setItem('isLogin', true)
		}
	})
}

export const logout = () => dispatch => {
	firebaseApp.auth().signOut().then(() => {
		dispatch(removeUser())
		localStorage.removeItem('isAdmin')
		localStorage.removeItem('isLogin')
	})
}

export const removeUser = () => {
	return {
		type: REMOVE_USER
	}
}
