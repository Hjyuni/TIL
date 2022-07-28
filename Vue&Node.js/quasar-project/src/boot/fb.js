// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDMA8fTGR7RYifm7_qrag78nqdRDVyVtQ",
  authDomain: "project-vue-a3fe4.firebaseapp.com",
  databaseURL: "https://project-vue-a3fe4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-vue-a3fe4",
  storageBucket: "project-vue-a3fe4.appspot.com",
  messagingSenderId: "204568169516",
  appId: "1:204568169516:web:68d06fa5d346fb03a4d589"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }