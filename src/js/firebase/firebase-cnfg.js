import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCQboDh7MdYexzQ9iKKBLnYdXvaQGXlSyw',
  authDomain: 'filmoteka-958ce.firebaseapp.com',
  projectId: 'filmoteka-958ce',
  storageBucket: 'filmoteka-958ce.appspot.com',
  messagingSenderId: '296487129865',
  appId: '1:296487129865:web:0b6475fab754c5940fb9d8',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export function regUser(mail, pass) {
  createUserWithEmailAndPassword(auth, mail, pass)
    .then(userCredential => {
      console.log(userCredential);
    })
    .catch(error => {
      console.log(error);
    });
}

export function loginUser(mail, pass) {
  signInWithEmailAndPassword(auth, mail, pass)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(userCredential);
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
