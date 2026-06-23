import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWa6lnBFL8iKqlZXnBJDwtRL1Z4fhzmL8",
  authDomain: "signitfyid.firebaseapp.com",
  projectId: "signitfyid",
  storageBucket: "signitfyid.firebasestorage.app",
  messagingSenderId: "966993424282",
  appId: "1:966993424282:web:229f7d173f3917ac9f5423",
  measurementId: "G-7SF0XSFTMH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const analytics = getAnalytics(app);

export default app;