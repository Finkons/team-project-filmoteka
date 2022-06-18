import refs from './refs';
import moviesListPatern from '../templates/list-of-movies.hbs';
import { getMoviesById } from './get-movies';
import { startLoader, stopLoader } from './loader.js';

const watchedEmptyTemplatesUa = `<p>Ваша бібліотека переглянутих фільмів порожня :(</p>`;
const queueEmptyTemplatesUa = `<p>Ваша бібліотека фільмів у черзі порожня :(</p>`;

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

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

export function watchedRender() {
  addEmptyTemplateEn('watched');
  if (document.querySelector('html').getAttribute('lang') === 'ua') {
    addEmptyTemplateUa();
  }

  const watchedLocalStorage = localStorage.getItem('watched_films');
  if (watchedLocalStorage && watchedLocalStorage.length > 2) {
    addMovieToGallery(watchedLocalStorage);
  }
}

function queueRender() {
  addEmptyTemplateEn('queue');
  if (document.querySelector('html').getAttribute('lang') === 'ua') {
    addEmptyTemplateUa();
  }

  const queueLocalStorage = localStorage.getItem('queued_films');
  if (queueLocalStorage && queueLocalStorage.length > 2) {
    addMovieToGallery(queueLocalStorage);
  }
}

export function ifMyLibraryOpen() {
  if (refs.myLibraryBtn.classList.contains('current')) {
    clearGalleryContainer();
  }
}

function addMovieToGallery(localMovieId) {
  clearGalleryContainer();
  const localMessage = localMovieId;
  const localParse = JSON.parse(localMessage);
  localParse.map(id => {
    renderMovie(id);
  });
}

export function renderAfterModalClose() {
  if (refs.myLibraryBtn.classList.contains('current')) {
    if (refs.libraryBtnWatched.classList.contains('active')) {
      watchedRender();
    } else if (refs.libraryBtnQueue.classList.contains('active')) {
      queueRender();
    }
  }
}

// refs.enLangBTN.addEventListener('click', whenEngBtnClick)




// function whenEngBtnClick() {
//   if (refs.myLibraryBtn.classList.contains('current')) {
//     console.log(refs.myLibraryBtn.classList.contains('current'))
//     const watchedLocalStorage = localStorage.getItem('watched_films');
//     const queueLocalStorage = localStorage.getItem('queued_films');
//     if (!watchedLocalStorage || watchedLocalStorage.length <= 2) {
//       addEmptyTemplateEn('watched');
//       console.log('click en in watched');
//     } else if (!queueLocalStorage || queueLocalStorage.length <= 2) {
//       addEmptyTemplateEn('queued');
//       console.log('click en in queue');
//     }
//   }
// }


function addEmptyTemplateEn(currentLibrary) {
    clearGalleryContainer();
    refs.galleryContainer.insertAdjacentHTML(
      'beforeend',
      `<p>Your ${currentLibrary} films library is empty :(</p>`,
    )
}

function addEmptyTemplateUa() {
    if (refs.libraryBtnWatched.classList.contains('active')) {
      clearGalleryContainer();
      refs.galleryContainer.insertAdjacentHTML(
        'beforeend',
        watchedEmptyTemplatesUa,
      )
    }
    else if (refs.libraryBtnQueue.classList.contains('active')) {
    clearGalleryContainer();
      refs.galleryContainer.insertAdjacentHTML(
        'beforeend',
        queueEmptyTemplatesUa,
      )
  }
}