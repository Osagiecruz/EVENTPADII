import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB03EI9Vfdyzc7U5HPnBRE5qT5jPxXIYSE",
  authDomain: "eventpadii.firebaseapp.com",
  projectId: "eventpadii",
  storageBucket: "eventpadii.appspot.com",
  messagingSenderId: "972114278965",
  appId: "1:972114278965:web:9a7035d32b9f3583dd8f7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);