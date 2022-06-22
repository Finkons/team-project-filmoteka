import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import authMarkup from '../templates/auth.hbs';
import authMarkupUk from '../templates/auth-uk.hbs';
import { startLoader, stopLoader } from './loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './refs';
import { regUser, loginUser, monitorAuthState } from './firebase/firebase-cnfg';

const UID = localStorage.getItem('uid');
refs.authorizationBtn.addEventListener('click', onBtnModalFormClick);

function onBtnModalFormClick(event) {
  event.preventDefault();
  instance.show();
}

function renderMarkupByPageLang() {
  let pageLang = localStorage.getItem('lang');
  let modalMarkup;
  // console.log(pageLang);
  if (pageLang === 'ua') {
    modalMarkup = authMarkupUk();
  }
  if (pageLang === 'en') {
    modalMarkup = authMarkup();
  }
  return modalMarkup;
}

const instance = basicLightbox.create(renderMarkupByPageLang(), {
  onShow: instance => {
    window.addEventListener('keydown', onEscPress);
    document.body.classList.toggle('no-scroll');
    instance.element().querySelector('#modal-auth-close').onclick = instance.close;

    const regForm = instance.element().querySelector('#regForm');
    const loginForm = instance.element().querySelector('#loginForm');

    addEventListenerForRegForm(regForm);
    addEventListenerForLoginForm(loginForm);
  },
  onClose: instance => {
    document.body.classList.toggle('no-scroll');
    window.removeEventListener('keydown', onEscPress);
  },
});

function addEventListenerForRegForm(form) {
  form.addEventListener('submit', regUserWithEmailPass);
}

function addEventListenerForLoginForm(form) {
  form.addEventListener('submit', loginUserWithEmailPass);
}

function regUserWithEmailPass(e) {
  e.preventDefault();

  const {
    elements: { email, pswd },
  } = e.currentTarget;

  const regMail = email.value;
  const regPass = pswd.value;

  regUser(regMail, regPass);
  instance.close();
}

function loginUserWithEmailPass(e) {
  e.preventDefault();

  const {
    elements: { email, pswd },
  } = e.currentTarget;

  const loginMail = email.value;
  const loginPass = pswd.value;

  loginUser(loginMail, loginPass);
  instance.close();
}

function onEscPress(event) {
  const ESC_KEY = 'Escape';
  if (event.code === ESC_KEY) {
    instance.close();
  }
}
