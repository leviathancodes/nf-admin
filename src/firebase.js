import firebase from 'firebase';
import 'firebase/auth';

const firebaseStageConfig = {
  apiKey: "AIzaSyCARu0MOuMCTb4CJORDLt1LOngiIvnoUkY",
  authDomain: "nf-site-e0396.firebaseapp.com",
  databaseURL: "https://nf-site-e0396.firebaseio.com",
  projectId: "nf-site-e0396",
  storageBucket: "nf-site-e0396.appspot.com",
  messagingSenderId: "1095650207607",
  appId: "1:1095650207607:web:c655b775cab4555c1de372",
  measurementId: "G-28PVHR01QD"
};

// Initialize Firebase
const backend = firebase.initializeApp(firebaseStageConfig);
firebase.analytics();

export default backend;
