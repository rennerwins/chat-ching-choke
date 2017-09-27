import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAShU7XQD5ji6DDf7PY__EUGb9LwvukrNU',
  authDomain: 'codelab-a8367.firebaseapp.com',
  databaseURL: 'https://codelab-a8367.firebaseio.com',
  projectId: 'codelab-a8367',
  storageBucket: 'codelab-a8367.appspot.com',
  messagingSenderId: '565799047733',
};

export const firebaseApp = firebase.initializeApp(config);
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
