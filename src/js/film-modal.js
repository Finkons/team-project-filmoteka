import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getMoviesById } from './get-movies';
import { startLoader, stopLoader } from './loader';
import { addFilmToWatched } from './film-local-storage';
import { addFilmToQueued } from './film-local-storage';
import { getMovieGenre } from './movie-genres';

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

    addListenerForCloseBtn(document.querySelector('.film-modal-close'));
  });
}

function addListenerForCloseBtn(closeBtn) {
  closeBtn.addEventListener('click', event => {
    instance.close();
  });
}

async function putFetchToMarkup(filmId) {
  try {
    const resultData = await getMoviesById(filmId);
    let markup = makeFilmModalMarkup([resultData.data]);
    return markup;
  } catch (error) {
    console.log(error);
  }
}

function makeFilmModalMarkup(result) {
  const filmModal = result
    .map(
      ({
        id,
        poster_path,
        title,
        vote_average,
        vote_count,
        popularity,
        original_title,
        genre_ids,
        overview,
      }) => {
        return `
        <div class="film-modal" data-id=${id}>
        <div class="film-poster-wrapper">
          <img class="film-poster-img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}"/>
        </div>
        <div class="film-info-wrapper">
          <h2 class="film-modal-header">${title}</h2>
          <ul class="film-modal-info">
            <li class="film-modal-item">
              <p class="film-item-title">Vote / Votes</p>
              <p class="film-item-desc">
                <span class="vote-mod color">${vote_average}</span>
                / <span class="vote-mod">${vote_count}</span>
              </p>
            </li>
            <li class="film-modal-item">
              <p class="film-item-title">Popularity</p>
              <p class="film-item-desc">${popularity}</p>
            </li>
            <li class="film-modal-item">
              <p class="film-item-title">Original Title</p>
              <p class="film-item-desc original-title">${original_title}</p>
            </li>
            <li class="film-modal-item">
              <p class="film-item-title">Genre</p>
              <p class="film-item-desc genre-desc">${genre_ids}</p>
            </li>
          </ul>
          <h3 class="film-modal-about original-title">ABOUT</h3>
          <p class="film-modal-overview">${overview}</p>
          <div class="film-modal-btns">
            <button class="modal-btn-watched" type="button">add to Watched</button>
            <button class="modal-btn-queue" type="button">add to queue</button>
          </div>
      </div>    
          <button class="film-modal-close" type="button">
            <svg class="modal-close-ico" width="30" height="30" viewBox="0 0 30 30">
              <path class="modal-close-ico" d="M8 8L22 22" stroke="black" stroke-width="2"></path>
              <path class="modal-close-ico" d="M8 22L22 8" stroke="black" stroke-width="2"></path>
            </svg>
          </button>
        </div>
        `;
      },
    )
    .join('');

  return filmModal;
}

function onEscPress(event) {
  const ESC_KEY = 'Escape';
  // console.log(event);
  if (event.code === ESC_KEY) {
    instance.close();
  }
}
