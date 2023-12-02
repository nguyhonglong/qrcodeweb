import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import {  getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8_JsGilpTL4x45POIPeAcC3-h3HReSA0",
  authDomain: "webqrcode-fc590.firebaseapp.com",
  projectId: "webqrcode-fc590",
  storageBucket: "webqrcode-fc590.appspot.com",
  messagingSenderId: "671672522492",
  appId: "1:671672522492:web:d1362020bf11d25d19e979",
  measurementId: "G-MK6WFYDX64"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

export { auth, db, storage }