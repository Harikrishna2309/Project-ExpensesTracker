
// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth"

import firebase from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBiT4hlECuROPBH6yGNP5tJWl_XMSoIm8U",
  authDomain: "expenses-tracker-81fe9.firebaseapp.com",
  projectId: "expenses-tracker-81fe9",
  storageBucket: "expenses-tracker-81fe9.appspot.com",
  messagingSenderId: "771863973118",
  appId: "1:771863973118:web:cb76ac291fd72a62b2e9af",
  measurementId: "G-BCZ2PPL3Y4"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();