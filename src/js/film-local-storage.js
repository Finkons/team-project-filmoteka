import { Notify } from 'notiflix';

const queueStoragedFilms = JSON.parse(localStorage.getItem('queued_films')) || [];
const watchedStoragedFilms = JSON.parse(localStorage.getItem('watched_films')) || [];

export function addFilmToQueued(filmId) {
  localStorage.setItem('queued_films', queueStoragedFilms);
  if (localStorage.getItem('queued_films').includes(filmId)) {
    queueStoragedFilms.splice(queueStoragedFilms.indexOf(filmId), 1);
  } else {
    queueStoragedFilms.push(filmId);
  }
  localStorage.setItem('queued_films', JSON.stringify(queueStoragedFilms));
}

export function addFilmToWatched(filmId) {
  localStorage.setItem('watched_films', watchedStoragedFilms);
  if (localStorage.getItem('watched_films').includes(filmId)) {
    watchedStoragedFilms.splice(watchedStoragedFilms.indexOf(filmId), 1);
  } else {
    watchedStoragedFilms.push(filmId);
  }
  localStorage.setItem('watched_films', JSON.stringify(watchedStoragedFilms));
}

export function notifySuccessQueued(queueBtn, filmId) {
  if (localStorage.getItem('queued_films').includes(filmId)) {
    Notify.success('Added to queued');
    document.querySelector('.modal-btn-watched').disabled = true;
    // queueBtn.classList.add('added');
    // queueBtn.textContent = 'Added to queued';
  } else {
    Notify.success('Deleted from queue');
    document.querySelector('.modal-btn-watched').disabled = false;
    // queueBtn.classList.remove('added');
    // queueBtn.textContent = 'Add to queue';
  }
}

export function notifySuccessWatched(watchBtn, filmId) {
  if (localStorage.getItem('watched_films').includes(filmId)) {
    Notify.success('Added to watched');
    document.querySelector('.modal-btn-queue').disabled = true;
    // watchBtn.classList.add('added');
    // watchBtn.textContent = 'Added to watched';
  } else {
    Notify.success('Deleted from watched');
    document.querySelector('.modal-btn-queue').disabled = false;
    // watchBtn.classList.remove('added');
    // watchBtn.textContent = 'Add to watched';
  }
}

export function makeDisableBtn(id) {
  const watchedLocalStorage = localStorage.getItem('watched_films');
  const queueLocalStorage = localStorage.getItem('queued_films');

  if (watchedLocalStorage && watchedLocalStorage.includes(id)) {
    document.querySelector('.modal-btn-queue').disabled = true;
  }
  if (watchedLocalStorage && queueLocalStorage.includes(id)) {
    document.querySelector('.modal-btn-watched').disabled = true;
  }
}
