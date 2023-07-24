import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC_fYP26DJh0Eq7SJ-adB29KZ46ojHbZRs",
    authDomain: "instagram-clone-react-959a2.firebaseapp.com",
    projectId: "instagram-clone-react-959a2",
    storageBucket: "instagram-clone-react-959a2.appspot.com",
    messagingSenderId: "830048846559",
    appId: "1:830048846559:web:a202cf7758fe4cbd99df6a",
    measurementId: "G-Z00JD3ZS25"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth()
  const storage = firebase.storage();

  export {db, auth , storage}



