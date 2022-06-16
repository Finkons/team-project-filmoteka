import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getMoviesById } from './get-movies';
import filmModalTemplate from '../templates/film-modal.hbs';
import { startLoader, stopLoader } from './loader';
import { addFilmToWatched } from './film-local-storage';
import { addFilmToQueued } from './film-local-storage';
import { watchFilmTrailer } from './movie-trailer';

const filmsContainer = document.querySelector('.cards-collection');
let instance;

filmsContainer.addEventListener('click', handleCardClick);

function handleCardClick(event) {
  if (!event.target.closest('li')) return;

  let filmId = event.target.closest('li').dataset.id;
  startLoader();
  putFetchToMarkup(filmId).then(markup => {
    instance = basicLightbox.create(markup, {
      onShow: () => {
        document.body.classList.toggle('no-scroll');
        stopLoader();
        window.addEventListener('keydown', onEscPress);
      },
      onClose: () => {
        document.body.classList.toggle('no-scroll');
        window.removeEventListener('keydown', onEscPress);
      },
    });

    instance.show();

    addListenerForWatched(document.querySelector('.modal-btn-watched'), filmId);
    addListenerForQueued(document.querySelector('.modal-btn-queue'), filmId);
    addListenerForCloseBtn(document.querySelector('.film-modal-close'));

    addListenerForTrailer(document.querySelector('.modal-btn-trailer'), filmId); 
  });
}

function addListenerForCloseBtn(closeBtn) {
  closeBtn.addEventListener('click', () => {
    instance.close();
  });
}

function addListenerForWatched(watchBtn, filmId) {
  watchBtn.addEventListener('click', () => {
    addFilmToWatched(filmId);
  });
}

function addListenerForQueued(queueBtn, filmId) {
  queueBtn.addEventListener('click', () => {
    addFilmToQueued(filmId);
  });
}


function addListenerForTrailer(trailerBtn, filmId) {
  trailerBtn.addEventListener('click', () => {
    watchFilmTrailer(filmId);
  });
}

async function putFetchToMarkup(filmId, lang) {
  try {
    const resultData = await getMoviesById(filmId, lang);
    let markup = filmModalTemplate(resultData.data);
    return markup;
  } catch (error) {
    console.log(error);
  }
}

function onEscPress(event) {
  const ESC_KEY = 'Escape';
  // console.log(event);
  if (event.code === ESC_KEY) {
    instance.close();
  }
}
