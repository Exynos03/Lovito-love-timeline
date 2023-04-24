import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBuA9P0XNwymLwoHpOsNElaAcgr1uRG4XA",
  authDomain: "loveto-love-timeline.firebaseapp.com",
  projectId: "loveto-love-timeline",
  storageBucket: "loveto-love-timeline.appspot.com",
  messagingSenderId: "1068876968985",
  appId: "1:1068876968985:web:0c1f47a2ae6289b9792688",
  measurementId: "G-X23Y14TPSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const userInfoRef = collection(db, 'userInfo');
