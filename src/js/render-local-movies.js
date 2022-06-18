import refs from './refs';
import moviesListPatern from '../templates/list-of-movies.hbs';
import { getMoviesById } from './get-movies';
import { startLoader, stopLoader } from './loader.js';

refs.libraryBtnWatched.addEventListener('click', WatchedBtnAction);
refs.libraryBtnQueue.addEventListener('click', QueueBtnAction);

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
  const watchedLocalStorage = localStorage.getItem('watched_films');
  if (watchedLocalStorage && watchedLocalStorage.length > 2) {
    addMovieToGallery(watchedLocalStorage);
  }
}

function queueRender() {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    `<p>Your queue films library is empty :(</p>`,
  );
  const queueLocalStorage = localStorage.getItem('queued_films');
  if (queueLocalStorage && queueLocalStorage.length > 2) {
    addMovieToGallery(queueLocalStorage);
  }
}

export function ifMyLibraryOpen() {
  if (refs.myLibraryBtn.classList.contains('current')) {
    refs.galleryContainer.innerHTML = '';
  }
}

function addMovieToGallery(localMovieId) {
  refs.galleryContainer.innerHTML = '';
  const localMessage = localMovieId;
  const localParse = JSON.parse(localMessage);
  localParse.map(id => {
    renderMovie(id);
  });
}
