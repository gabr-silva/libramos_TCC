import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

/*import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID,
} from "@env"

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};*/

//banco da isa
const firebaseConfig = {
    apiKey: "AIzaSyB-PwQjqA05kwdqEVwzhiy8slOfT1OVOQk",
    authDomain: "libramos-bd.firebaseapp.com",
    projectId: "libramos-bd",
    storageBucket: "libramos-bd.appspot.com",
    messagingSenderId: "1094313246508",
    appId: "1:1094313246508:web:26991f4712528ea005f689",
    measurementId: "G-2E4M0NSL3S"
};

//banco oficial
/*const firebaseConfig = {
    apiKey: "AIzaSyBp1FkFOfNFmKs2x4pOg33sqkthwJ-RYas",
    authDomain: "libramos-teste.firebaseapp.com",
    projectId: "libramos-teste",
    storageBucket: "libramos-teste.appspot.com",
    messagingSenderId: "647027211396",
    appId: "1:647027211396:web:2d817b62b288ec79e256d1",
    measurementId: "G-4QEMS2YHEK"
};*/

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

const db = getFirestore(app);

export { auth, db };

