// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,   GoogleAuthProvider , } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlNM3s69XszBmOF2dDRo2FtvZ7yvk1gZ0",
  authDomain: "expense-tracker-4d22e.firebaseapp.com",
  projectId: "expense-tracker-4d22e",
  storageBucket: "expense-tracker-4d22e.firebasestorage.app",
  messagingSenderId: "782780186246",
  appId: "1:782780186246:web:f96ce3ced6b7f4911fdb07",
  measurementId: "G-XTWZND9XDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

