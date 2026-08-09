import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";

// Configuration Firebase via variables d'environnement VITE_FIREBASE_*
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy_DEMO_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-mm.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-mm",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-mm.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abc123def456",
};

// Initialisation de Firebase App
let app = null;
let db = null;

try {
  if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("🔥 Firebase Firestore connecté avec succès au projet :", firebaseConfig.projectId);
  }
} catch (err) {
  console.warn("⚠️ Firebase non configuré ou hors-ligne, utilisation du mode local persistant.");
}

export { app, db, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot };
