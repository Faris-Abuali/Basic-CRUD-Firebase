import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_u917isqhdFKr8dZ8P-T9RmjMULTRumQ",
    authDomain: "crud-firebase-fares.firebaseapp.com",
    projectId: "crud-firebase-fares",
    storageBucket: "crud-firebase-fares.appspot.com",
    messagingSenderId: "758059705647",
    appId: "1:758059705647:web:e1b94ef7f168c4f407edda",
    measurementId: "G-J79HPB5SB5"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

