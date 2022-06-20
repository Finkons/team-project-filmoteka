import { getPopularMovies } from './get-movies';
import moviesListPatern from '../templates/list-of-movies.hbs';
import refs from './refs';
import { getGenres } from './get-movies';
import { startLoader, stopLoader } from './loader.js';
import { renderButtons } from './pagination';
import { otherGenresTemplate } from './render-local-movies';

function renderMoviesList(movies) {
  const markup = moviesListPatern(movies);
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

async function insertGenresToMovies(page) {
  const data = await getPopularMovies(page);
  const genresList = await getGenres(langCurrent());
  renderButtons(data.page, data.total_pages);

  return data.results.map(movie => ({
    ...movie,
    release_date: movie.release_date.split('-')[0],
    genres: movie.genre_ids.map(id => genresList.genres.filter(el => el.id === id)).flat(),
  }));
}

function langCurrent() {
  if (localStorage.getItem('lang') === 'ua') {
    return 'uk'
  } 
    return 'en'
}


export function insertPopularMovies(page = 1) { 
  startLoader();

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

insertPopularMovies();