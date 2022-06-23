import { Notify } from 'notiflix';

const queueStoragedFilms = JSON.parse(localStorage.getItem('queued_films')) || [];
const watchedStoragedFilms = JSON.parse(localStorage.getItem('watched_films')) || [];

export function addFilmToQueued(filmId) {
  if (checkIfLoggedIn() === false) {
    return;
  } else {
    localStorage.setItem('queued_films', queueStoragedFilms);
    if (localStorage.getItem('queued_films').includes(filmId)) {
      queueStoragedFilms.splice(queueStoragedFilms.indexOf(filmId), 1);
    } else {
      queueStoragedFilms.push(filmId);
    }
    localStorage.setItem('queued_films', JSON.stringify(queueStoragedFilms));
  }
}

export function addFilmToWatched(filmId) {
  if (checkIfLoggedIn() === false) {
    return;
  } else {
    localStorage.setItem('watched_films', watchedStoragedFilms);
    if (localStorage.getItem('watched_films').includes(filmId)) {
      watchedStoragedFilms.splice(watchedStoragedFilms.indexOf(filmId), 1);
    } else {
      watchedStoragedFilms.push(filmId);
    }
    localStorage.setItem('watched_films', JSON.stringify(watchedStoragedFilms));
  }
}

export function notifySuccessQueued(queueBtn, filmId) {
  if (checkIfLoggedIn() === false) {
    return;
  } else {
    const watchedBtn = document.querySelector('.modal-btn-watched');
    let pageLang = localStorage.getItem('lang');

    if (localStorage.getItem('queued_films').includes(filmId)) {
      if (pageLang === 'ua') {
        Notify.success('Додано до черги');
        queueBtn.textContent = 'В черзі';
      }
      if (pageLang === 'en') {
        Notify.success('Added to queued');
        queueBtn.textContent = 'Queued';
      }
      watchedBtn.disabled = true;
    } else {
      if (pageLang === 'ua') {
        Notify.success('Видалено з черги');
        queueBtn.textContent = 'Додати до черги';
      }
      if (pageLang === 'en') {
        Notify.success('Deleted from queue');
        queueBtn.textContent = 'Add to queue';
      }
      watchedBtn.disabled = false;
    }
  }
}

export function notifySuccessWatched(watchBtn, filmId) {
  if (checkIfLoggedIn() === false) {
    return;
  } else {
    const queueBtn = document.querySelector('.modal-btn-queue');
    let pageLang = localStorage.getItem('lang');

    if (localStorage.getItem('watched_films').includes(filmId)) {
      if (pageLang === 'ua') {
        Notify.success('Додано до переглянутих');
        watchBtn.textContent = 'Переглянуто';
      }
      if (pageLang === 'en') {
        Notify.success('Added to watched');
        watchBtn.textContent = 'Added to watched';
      }
      queueBtn.disabled = true;
    } else {
      if (pageLang === 'ua') {
        Notify.success('Видалено з переглянутих');
        watchBtn.textContent = 'Додати до переглянутих';
      }
      if (pageLang === 'en') {
        Notify.success('Deleted from watched');
        watchBtn.textContent = 'Add to watched';
      }
      queueBtn.disabled = false;
    }
  }
}

export function makeDisableBtn(id) {
  const watchedLocalStorage = localStorage.getItem('watched_films');
  const queueLocalStorage = localStorage.getItem('queued_films');
  const watchBtn = document.querySelector('.modal-btn-watched');
  const queueBtn = document.querySelector('.modal-btn-queue');
  let pageLang = localStorage.getItem('lang');

  if (pageLang === 'ua') {
    if (watchedLocalStorage && watchedLocalStorage.includes(id)) {
      document.querySelector('.modal-btn-queue').disabled = true;
      watchBtn.textContent = 'Переглянуто';
    }
  }

  if (pageLang === 'en') {
    if (watchedLocalStorage && watchedLocalStorage.includes(id)) {
      document.querySelector('.modal-btn-queue').disabled = true;
      watchBtn.textContent = 'Added to watched';
    }
  }

  if (pageLang === 'ua') {
    if (queueLocalStorage && queueLocalStorage.includes(id)) {
      document.querySelector('.modal-btn-watched').disabled = true;
      queueBtn.textContent = 'В черзі';
    }
  }

  if (pageLang === 'en') {
    if (queueLocalStorage && queueLocalStorage.includes(id)) {
      document.querySelector('.modal-btn-watched').disabled = true;
      queueBtn.textContent = 'Queued';
    }
  }
}

export function checkIfLoggedIn() {
  const UID = localStorage.getItem('uid');
  if (!UID) {
    if (localStorage.getItem('lang') === 'ua') {
      Notify.warning('Будь ласка зайдіть в акаунт')
      return false;
    }
    if (localStorage.getItem('lang') === 'en') {
      Notify.warning('Log in first please')
      return false;
    }
  }
}