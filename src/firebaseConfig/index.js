// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3RpVt5mUcqafsrYAqsIMm72YtiJdL5QQ",
  authDomain: "work-place-accio.firebaseapp.com",
  projectId: "work-place-accio",
  storageBucket: "work-place-accio.appspot.com",
  messagingSenderId: "794342631150",
  appId: "1:794342631150:web:a32666760f7874255835ff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);