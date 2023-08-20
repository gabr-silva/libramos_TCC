import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDoc, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAvs0M7IYr75MP05Uh4YX1eWd1qqM6CFUw",
  authDomain: "libramos.firebaseapp.com",
  databaseURL: "https://libramos-default-rtdb.firebaseio.com",
  projectId: "libramos",
  storageBucket: "libramos.appspot.com",
  messagingSenderId: "871500203838",
  appId: "1:871500203838:web:5907ac8c0f3a915350ce6f",
  measurementId: "G-GM5F97R62X"
};

  // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const auth = getAuth(firebaseApp);
    const db = getFirestore(app);

    // async function getCities(db) {
    //   const citiesCol = collection(db, 'cities');
    //   const citySnapshot = await getDocs(citiesCol);
    //   const cityList = citySnapshot.docs.map(doc => doc.data());
    //   return cityList;
    // }

    //onAuthStateChanged(auth, user => {
    //  if(user = null) {
    //    console.log('logged in!');
    //  } else {
    //    console.log('No user');
    //  }
    //});

    export default database