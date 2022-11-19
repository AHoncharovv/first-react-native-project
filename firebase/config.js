import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDSnaYh1140JznkGs7a1bRPAqGz9KYA_XY",
  authDomain: "myveryfirstproject-c2ca0.firebaseapp.com",
  projectId: "myveryfirstproject-c2ca0",
  storageBucket: "myveryfirstproject-c2ca0.appspot.com",
  messagingSenderId: "122019234561",
  appId: "1:122019234561:web:5577e0b21223e5905c9100",
  measurementId: "G-M08YRMJEZW"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;