import Firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpB9S9bhDOh_P_wHHutttS4RZMUYbhI14",
  authDomain: "space-x-demo-project.firebaseapp.com",
  projectId: "space-x-demo-project",
  storageBucket: "space-x-demo-project.appspot.com",
  messagingSenderId: "657145956430",
  appId: "1:657145956430:web:b47deb243b88147dc59b1f",
};

const firebase = Firebase.initializeApp(firebaseConfig);

export { firebase };
