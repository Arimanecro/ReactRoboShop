import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/app";
import "firebase/database";

const config = {
  apiKey: "**********************",
  authDomain: "roboshop-9ef9d.firebaseapp.com",
  databaseURL: "https://roboshop-9ef9d.firebaseio.com",
  projectId: "roboshop-9ef9d",
  storageBucket: "roboshop-9ef9d.appspot.com",
  messagingSenderId: "61334982360"
};
firebase.initializeApp(config);

const firebaseDB = firebase.firestore();
firebaseDB.settings({ });

export default firebaseDB;
