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

export const createUserProfileDocument= async (userAuth,additionalData) => {
  if(!userAuth) return;
  const userRef=firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists){
    const {displayName,email }= userAuth;
    const createdAt= new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch(error){
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

export const addCollectionAndDocument= async (collectionKey,objectsToAdd) => {
  const collectionRef= firestore.collection(collectionKey);

  const batch= firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef= collectionRef.doc();
    batch.set(newDocRef,obj)
  })
  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection= collections.docs.map(doc => {
    const {title,items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  
  return transformedCollection.reduce((accumulator,collection) => {
    accumulator[collection.title.toLowerCase()]=collection;
    return accumulator;
  },{})
}

export const auth =firebase.auth();
export const firestore= firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle= () => auth.signInWithPopup(provider);

export default firebase;