import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyB0Ho78eoV3oputzOT-01djnpI3ia0NJac",
    authDomain: "diet-plan-cef8d.firebaseapp.com",
    databaseURL: "https://diet-plan-cef8d.firebaseio.com",
    projectId: "diet-plan-cef8d",
    storageBucket: "diet-plan-cef8d.appspot.com",
    messagingSenderId: "1013643846899",
    appId: "1:1013643846899:web:88fb4dc9f0027d70de4386",
    measurementId: "G-HGLMV8N0HJ"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  // Exporting Firestore DB
  export default firebaseApp.firestore();