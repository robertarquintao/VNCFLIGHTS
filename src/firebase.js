import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCc5LwrfzCf6b4gTWN8X-Hp_ge9TR8HULY",
  authDomain: "vnc-flight.firebaseapp.com",
  projectId: "vnc-flight",
  storageBucket: "vnc-flight.firebasestorage.app",
  messagingSenderId: "1088771758209",
  appId: "1:1088771758209:web:380460032d513ce5099580"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
