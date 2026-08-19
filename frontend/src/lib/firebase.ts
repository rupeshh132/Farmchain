import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqo84SIUeWitnO1-yFPqzYCqCjUszFlAY",
  authDomain: "farmchain-e1045.firebaseapp.com",
  projectId: "farmchain-e1045",
  storageBucket: "farmchain-e1045.firebasestorage.app",
  messagingSenderId: "929657091678",
  appId: "1:929657091678:web:688a7df539991844ea26cf",
  measurementId: "G-B8PBJWHHQY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
