import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSPdXujgHdu0B7unpzX0VvOTKLyMZ5HdA",
  authDomain: "shopping-3585a.firebaseapp.com",
  projectId: "shopping-3585a",
  storageBucket: "shopping-3585a.firebasestorage.app",
  messagingSenderId: "85769446186",
  appId: "1:85769446186:web:227074e20396f79bdeb453",
  measurementId: "G-9W2ZQ26NG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app) 
export const provider = new GoogleAuthProvider()