import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDyHVtcMrFmP7cm9n7ywrWdMxKmED1e92s",
  authDomain: "crwn-clothing-7df43.firebaseapp.com",
  projectId: "crwn-clothing-7df43",
  storageBucket: "crwn-clothing-7df43.appspot.com",
  messagingSenderId: "116654433823",
  appId: "1:116654433823:web:f4404ec2b69aaa2c57572a"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
 if (!userAuth) return;

 const userRef = firestore.doc(`users/${userAuth.uid}`);
 
 const snapShot = await userRef.get();

 if (!snapShot.exists) {
  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try {
    await userRef.set({
      displayName,
      email,
      createdAt,
      ...additionalData
    })
  } catch (error) {
    console.log('error creating user', error.message);
  }
 }

 return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;