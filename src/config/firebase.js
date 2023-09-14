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

const firebaseConfig = {
    apiKey: "AIzaSyBp1FkFOfNFmKs2x4pOg33sqkthwJ-RYas",
    authDomain: "libramos-teste.firebaseapp.com",
    projectId: "libramos-teste",
    storageBucket: "libramos-teste.appspot.com",
    messagingSenderId: "647027211396",
    appId: "1:647027211396:web:2d817b62b288ec79e256d1",
    measurementId: "G-4QEMS2YHEK"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

const db = getFirestore(app);

export { auth, db };

