// File: auth.js

// Import the necessary functions from the Firebase SDK
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// import firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
// import { firebaseConfig } from '../../public/firebase-config';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8ZG7FvSF8_u3smNVX4RoWlhl8Z-weg1g",
  authDomain: "empa-b8f4b.firebaseapp.com",
  projectId: "empa-b8f4b",
  storageBucket: "empa-b8f4b.appspot.com",
  messagingSenderId: "748440507758",
  appId: "1:748440507758:web:275205f61f3c4c4b399d7f",
  measurementId: "G-MB182TVZ7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

// export const signUp = (email, password) => {
//   return createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // User registered successfully
//       const user = userCredential.user;
//       return user;
//     })
//     .catch((error) => {
//       // Handle errors
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error(`Error during sign-up: ${errorCode} - ${errorMessage}`);
//       throw error;
//     });
// };

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User signed in successfully
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error during sign-in: ${errorCode} - ${errorMessage}`);
      throw error;
    });
};

export const setupAuthListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};