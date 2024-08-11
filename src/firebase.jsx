// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBLeh_20WkLHf_Pu81-vqRJnPMoD14RnUw",
  authDomain: "sahaya-76f05.firebaseapp.com",
  projectId: "sahaya-76f05",
  storageBucket: "sahaya-76f05.appspot.com",
  messagingSenderId: "343238432969",
  appId: "1:343238432969:web:a89a9129a3393e1e1f5518",
  measurementId: "G-W67RPXHPW1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
