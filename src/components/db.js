

  // firebase.js

  import { initializeApp } from 'firebase/app';
  import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC44iY50dkUMBjfyq2H1KsfvG5LnLcfpxs",
    authDomain: "mprsem5.firebaseapp.com",
    projectId: "mprsem5",
    storageBucket: "mprsem5.appspot.com",
    messagingSenderId: "353416420733",
    appId: "1:353416420733:web:4d54ff7ff363bd1c528014",
    measurementId: "G-9K8HKX4JG9"
  };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
// export const auth = auth();
// export const firestore = firebase.firestore();
