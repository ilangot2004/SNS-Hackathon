// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvtwXhybTjOY4w0EofrhcWvP-TyE8YU64",
  authDomain: "globetrotter-a08b2.firebaseapp.com",
  projectId: "globetrotter-a08b2",
  storageBucket: "globetrotter-a08b2.firebasestorage.app",
  messagingSenderId: "919816326152",
  appId: "1:919816326152:web:cbd5a4a3a2a7513fe595bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

