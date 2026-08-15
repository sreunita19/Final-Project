// Firebase setup.
// 1) Create a project at https://console.firebase.google.com
// 2) Enable Authentication -> Sign-in method -> Email/Password
// 3) Copy your web app config into a .env file at the project root (see .env.example)
// 4) Restart `npm run dev` after adding the .env file — Vite only reads env vars on startup.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKhYi1GOaeSfJuOLd_4UMbcEsd7AUvivs",
  authDomain: "explorecambodia-c9137.firebaseapp.com",
  projectId: "explorecambodia-c9137",
  storageBucket: "explorecambodia-c9137.firebasestorage.app",
  messagingSenderId: "788182447630",
  appId: "1:788182447630:web:5c024c32d88efe6578ae5f",
  measurementId: "G-D4K7YV559W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
