import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQHJOsdjMxbN70ophg3lsLbUpHOsZMZAQ",
  authDomain: "hello-brother-a7fe2.firebaseapp.com",
  projectId: "hello-brother-a7fe2",
  storageBucket: "hello-brother-a7fe2.appspot.com",
  messagingSenderId: "314831918340",
  appId: "1:314831918340:web:0bb096be3e0fcb650a6c51",
  measurementId: "G-2SPMG4SH8V",
};
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
