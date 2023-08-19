import * as firebase from 'firebase'

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

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase}