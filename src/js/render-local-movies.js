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
    response.data.release_date = response.data.release_date.substr(0, 4)

    const twoOfGenres = response.data.genres.slice(0, 2)
    if (response.data.genres.length > 2) {
      twoOfGenres.push(otherGenresTemplate())
    }
    
    response.data.genres = twoOfGenres;
    let markup = moviesListPatern([response.data]);
    return refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log(error);
  }
}

export function otherGenresTemplate() {
  if (document.querySelector('html').getAttribute('lang') === 'ua') {
    return { name: 'інше'}
  } else if (document.querySelector('html').getAttribute('lang') === 'en') {
    return { name: 'other'}
  }
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}


export function watchedRender() {
  removeBtnMore()
  addEmptyTemplateEn('watched');
  if (localStorage.getItem('lang') === 'ua') {
    addEmptyTemplateUa();
  }

  const watchedLocalStorage = localStorage.getItem('watched_films');
  if (watchedLocalStorage && watchedLocalStorage.length > 2) {
    addMovieToGallery(watchedLocalStorage);

    
    addLoadMoreBtn()
    if (JSON.parse(watchedLocalStorage).length <= 3) {
      makeDisableBtn()
    }
    document.querySelector('.more_btn').addEventListener('click', wichLocalMoreListener)
  }
}

function queueRender() {
  removeBtnMore()
  addEmptyTemplateEn('queue');
  if (localStorage.getItem('lang') === 'ua') {
    addEmptyTemplateUa();
  }

  const queueLocalStorage = localStorage.getItem('queued_films');
  if (queueLocalStorage && queueLocalStorage.length > 2) {
    addMovieToGallery(queueLocalStorage);
    
    
    addLoadMoreBtn()
    if (JSON.parse(queueLocalStorage).length <= 3) {
      makeDisableBtn()
    }
    document.querySelector('.more_btn').addEventListener('click', wichLocalMoreListener)
  }
}

function makeDisableBtn() {
  const btn = document.querySelector('.more_btn');
  btn.textContent = document.querySelector('html').getAttribute('lang') === 'ua' ? 'кінець списку' : 'end of list';
  btn.disabled = true
}

function removeBtnMore() {
  if (document.querySelector('.more_btn_wrap')) {
     document.querySelector('.more_btn_wrap').remove();
  }
}

export function ifMyLibraryOpen() {
  if (refs.myLibraryBtn.classList.contains('current')) {
    clearGalleryContainer();
  }
}

let firstSliceMovie = 0;
let lastSliceMovie = 3;
function addMovieToGallery(localMovieId) {
  clearGalleryContainer();

  firstSliceMovie = 0;
  lastSliceMovie = 3;
  const localMessage = localMovieId;
  const localParse = JSON.parse(localMessage);
  
  const localSlice = localParse.slice(firstSliceMovie, lastSliceMovie);

  localSlice.map(id => {
    renderMovie(id);
  });
}



function wichLocalMoreListener() {
  if (refs.libraryBtnWatched.classList.contains('active')) {
    renderMoreMovie(localStorage.getItem('watched_films'))
  } else if (refs.libraryBtnQueue.classList.contains('active')) {
    renderMoreMovie(localStorage.getItem('queued_films'))
}
}

function renderMoreMovie(localMovieId) {
  startLoader();

  firstSliceMovie += 3;
  lastSliceMovie += 3;
  const localMessage = localMovieId;
  const localParse = JSON.parse(localMessage);
  
  const localSlice = localParse.slice(firstSliceMovie, lastSliceMovie);
  
  localSlice.map(id => {
    renderMovie(id);
  });
  if (lastSliceMovie >= localParse.length) {
    makeDisableBtn()
  }
  stopLoader();
}

function addLoadMoreBtn() {
  const markup = `<div class="more_btn_wrap"style="display: flex;  justify-content: center;
  align-items: center; margin-bottom: 60px;"><button class="button more_btn" style="display: flex;  justify-content: center;
  align-items: center;" type="button" >${document.querySelector('html').getAttribute('lang') === 'ua' ? 'більше' : 'more'}</button></div>`;
  refs.galleryContainer.insertAdjacentHTML(
        'afterend',
        markup,
  )
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

const onClick = () => {
  setTimeout(() => {
    renderAfterModalClose();
  }, 20);
};

refs.enLangBTN.addEventListener('click', onClick)
refs.uaLangBTN.addEventListener('click', onClick)

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



