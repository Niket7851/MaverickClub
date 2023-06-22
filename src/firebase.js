import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app'; // 
import 'firebase/compat/firestore'; 



// Your web app's Firebase configuration
const firebaseConfig = {
  // Your Firebase configuration options...
  apiKey: "AIzaSyDH8uw7j2FHIbypYD4hjcp1a-HxDDUuc3c" ,
  authDomain: "maverickclub-6abe8.firebaseapp.com",
  projectId: "maverickclub-6abe8",
  storageBucket: "maverickclub-6abe8.appspot.com",
  messagingSenderId: "546047688252",
  appId: "1:546047688252:web:e33bb37fb7ed9a6377cd39",
  measurementId: "G-5Y6PFX3JZQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Update the initialization
const storage = getStorage(app);
const firestore = getFirestore(app);


export { app as firebase, auth, db, storage, firestore };
export default app;
