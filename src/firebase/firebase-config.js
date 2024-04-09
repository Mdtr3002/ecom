// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIcbFblpjRAAEI_JLGizPvEMxGCwtENIY",
  authDomain: "gdsc-game-ec439.firebaseapp.com",
  projectId: "gdsc-game-ec439",
  storageBucket: "gdsc-game-ec439.appspot.com",
  messagingSenderId: "333611561501",
  appId: "1:333611561501:web:ab56e277a1828d47904cf4",
  measurementId: "G-D7754D4EKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
