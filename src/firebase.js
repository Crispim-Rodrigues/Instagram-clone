// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMGafOCnzpEzgNhvBRQlUoJtyRwigP5GE",
  authDomain: "instagram-clone-completo.firebaseapp.com",
  projectId: "instagram-clone-completo",
  storageBucket: "instagram-clone-completo.appspot.com",
  messagingSenderId: "999073749949",
  appId: "1:999073749949:web:18e1fd1ac6dd06f1ed10d4",
  measurementId: "G-VF61GCC5JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);


export {db,auth,storage,functions}