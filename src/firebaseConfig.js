import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCVzaAaSYvbYe25UF9-YzwMAwk5h-Kjbgs",
    authDomain: "pokeapi-28baf.firebaseapp.com",
    projectId: "pokeapi-28baf",
    storageBucket: "pokeapi-28baf.appspot.com",
    messagingSenderId: "649445443596",
    appId: "1:649445443596:web:4dfe846d3dfc9dd3c10629"
  };



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth  = getAuth(app);
