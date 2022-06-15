import refs from './refs';
import moviesListPatern from '../templates/list-of-movies.hbs';
import { getMoviesById } from './get-movies';
import { startLoader, stopLoader } from './loader.js';

refs.libraryBtnWatched.addEventListener('click', WatchedBtnAction);
refs.libraryBtnQueue.addEventListener('click', QueueBtnAction);

////////// !! это нужно только для примера !!!

const WATCHED_LOCALSTORAGE = 'WATCHED_localstorage';
const QUEUE_LOCALSTORAGE = 'QUEUE_localstorage';

const Watchedids = ['414906', '526896', '705861', '361743'];
const queueids = ['507086', '639933'];

function setLocalStorage() {
  localStorage.setItem(WATCHED_LOCALSTORAGE, JSON.stringify(Watchedids));
}
setLocalStorage();
function setQueueLocalStorage() {
  localStorage.setItem(QUEUE_LOCALSTORAGE, JSON.stringify(queueids));
}
setQueueLocalStorage();

//////////////// !!!

function WatchedBtnAction(e) {
  const currentButton = e.target;

  refs.libraryBtnQueue.classList.remove('active');
  currentButton.classList.add('active');

  ifMyLibraryOpen();

  startLoader();
  stopLoader();

  watchedRender();
}

function QueueBtnAction(e) {
  const currentButton = e.target;

  refs.libraryBtnWatched.classList.remove('active');
  currentButton.classList.add('active');

  ifMyLibraryOpen();

  startLoader();
  stopLoader();

  queueRender();
}

async function renderMovie(filmId) {
  try {
    const response = await getMoviesById(filmId);
    let markup = moviesListPatern([response.data]);
    return refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log(error);
  }
}

export function watchedRender() {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    `<p>Your watched films library is empty :(</p>`,
  );
  if (localStorage.getItem(WATCHED_LOCALSTORAGE)) {
    refs.galleryContainer.innerHTML = '';
    const localMessage = localStorage.getItem(WATCHED_LOCALSTORAGE);
    const localGetParse = JSON.parse(localMessage);
    localGetParse.map(id => {
      renderMovie(id);
    });
  }
}

function queueRender() {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    `<p>Your queue films library is empty :(</p>`,
  );
  if (localStorage.getItem(QUEUE_LOCALSTORAGE)) {
    refs.galleryContainer.innerHTML = '';
    const localMessage = localStorage.getItem(QUEUE_LOCALSTORAGE);
    const localGetParse = JSON.parse(localMessage);
    localGetParse.map(id => {
      renderMovie(id);
    });
  }
}

export function ifMyLibraryOpen() {
  if (refs.myLibraryBtn.classList.contains('current')) {
    refs.galleryContainer.innerHTML = '';
  }
}
