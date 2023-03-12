import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


const config= {
    apiKey: "AIzaSyDNs9CUrcqVon0i9RTS-H7aWJnuXvsVU00",
    authDomain: "crwn-db-f5b10.firebaseapp.com",
    projectId: "crwn-db-f5b10",
    storageBucket: "crwn-db-f5b10.appspot.com",
    messagingSenderId: "422874409005",
    appId: "1:422874409005:web:38d15a976a43814f4cb0a4",
    measurementId: "G-3MS7SPTQWH"
  };

firebase.initializeApp(config);
export const auth =firebase.auth();
export const firestore= firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle= () => auth.signInWithPopup(provider);

export default firebase;