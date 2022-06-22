import moviesListPatern from '../templates/list-of-movies.hbs';
import refs from './refs';
import { getGenres } from './get-movies';
import { startLoader, stopLoader } from './loader.js';
import { renderButtons } from './pagination';
import { otherGenresTemplate } from './render-local-movies';
import { getPopularMovies } from './get-movies';
import { createSearchFetch } from './search-movies';
import { langCurrent } from './language';


function renderMoviesList(movies) {
  const markup = moviesListPatern(movies);
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

async function getGenresToCards() {
  const genresList = await getGenres(langCurrent());
  localStorage.setItem("genres", JSON.stringify(genresList));
}

getGenresToCards();

async function insertGenresToMovies(page) {
  const data = await getPopularMovies(page);
  const genresLS = JSON.parse(localStorage.getItem("genres"));
  
  renderButtons(data.page, data.total_pages);

  if (genresLS) {
    return data.results.map(movie => ({
      ...movie,
      release_date: releaseDateCheck(movie),//movie.release_date.split('-')[0],
      genres: movie.genre_ids.map(id => genresLS.genres.filter(el => el.id === id)).flat(),
    }))
  };
}

function releaseDateCheck(movie) {
  if (movie.release_date) {
  return movie.release_date.split('-')[0]
} return 'no info'
}

export function insertPopularMovies(query,page = 1) {
  startLoader();
  if (query) {
    createSearchFetch(query,page)
    .then(res => {
      renderMoviesList(res); // how it renders HTML inside DOM?
      stopLoader();
    })
  } else {
    insertGenresToMovies(page)
    .then(res => {
      res.map(element => {
        if (element.genres.length > 2) {
          const Obj = otherGenresTemplate();
          element.genres[2] = Obj;
          element.genres.length = 3;
        }
      });
      renderMoviesList(res);
      stopLoader();
    })
    .catch(error => {
      console.log(error.message);
    });
  }
}
insertPopularMovies(); 

function onClick ()  {
  if (refs.homeBtn.classList.contains('current')) {
    setTimeout(() => {
      refs.galleryContainer.innerHTML = '';
      const currentPage = localStorage.getItem('current_page')
    insertGenresToMovies(currentPage).then(res => {
      res.map(element => {
        if (element.genres.length > 2) {
          const Obj = otherGenresTemplate();
          element.genres[2] = Obj;
          element.genres.length = 3;
        }
      });
      renderMoviesList(res);
      stopLoader();
    })
    .catch(error => {
      console.log(error.message);
    })
  }, 20);
  }
};

refs.enLangBTN.addEventListener('click', onClick)
refs.uaLangBTN.addEventListener('click', onClick)