import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyA9nabNpHTvAWIFHC2tMDu-jrwl3XER18Q",
    authDomain: "eshop-988f1.firebaseapp.com",
    projectId: "eshop-988f1",
    storageBucket: "eshop-988f1.appspot.com",
    messagingSenderId: "897598583541",
    appId: "1:897598583541:web:0584bf0636aabfe1e24bbc",
    measurementId: "G-3GLX2C41HR"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth  = firebaseApp.auth();    

  export {db, auth}