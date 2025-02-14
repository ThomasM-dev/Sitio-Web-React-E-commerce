// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqkCjY3F2I-osDePBu6OmgdShfowNmLhE",
  authDomain: "caroflorecer-10418.firebaseapp.com",
  databaseURL: "https://caroflorecer-10418-default-rtdb.firebaseio.com",
  projectId: "caroflorecer-10418",
  storageBucket: "caroflorecer-10418.firebasestorage.app",
  messagingSenderId: "119283757240",
  appId: "1:119283757240:web:240d6387fad3a390ed044d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

// Export instances
export { app, auth, database, firestore };
