// firebase.js (for Firebase v9 and above)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAaHzgVUx_gvdiCVOTEjLuvR5fk0M284_Q",
  authDomain: "university-finder-9c18c.firebaseapp.com",
  projectId: "university-finder-9c18c",
  storageBucket: "university-finder-9c18c.appspot.com",
  messagingSenderId: "373739791562",
  appId: "1:373739791562:web:5e215cd163184f732c8033",
};

// Initialize Firebase app (singleton)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };