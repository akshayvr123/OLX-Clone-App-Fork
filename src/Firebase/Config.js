import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf8kAXe39QqoUdNuFWnj8ueD7LkkeGf1Y",
  authDomain: "fir-a29c1.firebaseapp.com",
  projectId: "fir-a29c1",
  storageBucket: "fir-a29c1.appspot.com",
  messagingSenderId: "959139004659",
  appId: "1:959139004659:web:fd471f2f7b6aa3669b3786",
  measurementId: "G-B2YR5L0CWY"
};

export default firebase.initializeApp(firebaseConfig)

