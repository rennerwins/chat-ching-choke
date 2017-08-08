import * as firebase from 'firebase'

const config = {
	// Put your firebase config here
}

export const firebaseApp = firebase.initializeApp(config)
export const facebookProvider = new firebase.auth.FacebookAuthProvider()
