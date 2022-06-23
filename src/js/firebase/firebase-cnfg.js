import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  AuthErrorCodes,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import refs from '../refs';
import { startLoader, stopLoader } from '../loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { instance } from '../modal-auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCQboDh7MdYexzQ9iKKBLnYdXvaQGXlSyw',
  authDomain: 'filmoteka-958ce.firebaseapp.com',
  databaseURL: 'https://filmoteka-958ce-default-rtdb.firebaseio.com',
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
      const user = userCredential.user;
      instance.close();
      return user;
    })
    .catch(error => {
      showLoginError(error);
    });
}

export function loginUser(mail, pass) {
  signInWithEmailAndPassword(auth, mail, pass)
    .then(userCredential => {
      const user = userCredential.user;
      instance.close();
      return user;
    })
    .catch(error => {
      showLoginError(error);
    });
}

refs.logOutBtn.addEventListener('click', handleLogOut);

function handleLogOut(e) {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      startLoader();
      refs.authorizationBtn.classList.remove('visually-hidden');
      refs.logOutBtn.classList.add('visually-hidden');
      stopLoader();
    })
    .catch(error => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

onAuthStateChanged(auth, user => {
  if (user !== null) {
    // showLoginState(user);
    const uid = user.uid;
    localStorage.setItem('uid', uid);
    refs.authorizationBtn.classList.add('visually-hidden');
    refs.logOutBtn.classList.remove('visually-hidden');
    return uid;
  } else {
    // User is signed out
    localStorage.removeItem('uid');
  }
});

// Handle UI
function showLoginError(error) {
  if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
    Notify.failure(`Wrong password. Try again.`);
  } else {
    Notify.failure(`${error.message}`);
  }
}

// function showLoginState(user) {
//   Notify.success(`You're logged in with email: ${user.email}`);
// }

refs.logOutBtn.addEventListener('click', reload)

function reload() {
if (refs.authorizationBtn.classList.contains('visually-hidden')) {
       return window.location.reload()
     }
}