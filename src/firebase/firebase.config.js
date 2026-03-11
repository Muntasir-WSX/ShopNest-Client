// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoh-UoObk5OTGhJjle21HDXXsFaB7_W2c",
  authDomain: "simple-firebase-auth-85128.firebaseapp.com",
  projectId: "simple-firebase-auth-85128",
  storageBucket: "simple-firebase-auth-85128.firebasestorage.app",
  messagingSenderId: "1050590482578",
  appId: "1:1050590482578:web:1fc5f158638a733f5fd64b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);