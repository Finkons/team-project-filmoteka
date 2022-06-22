import moviesListPatern from '../templates/list-of-movies.hbs';
import refs from './refs';
import { getGenres } from './get-movies';
import { startLoader, stopLoader } from './loader.js';
import { renderButtons } from './pagination';
import { otherGenresTemplate } from './render-local-movies';
import { getPopularMovies } from './get-movies';
import { createSearchFetch } from './search-movies';
import { langCurrent } from './language';
import { SEARCH_TYPE, insertGenresToMoviesByYear, insertGenresToMoviesByGenres } from './search-form';

localStorage.removeItem(SEARCH_TYPE);

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

export function insertPopularMovies(query, page = 1,) {
  startLoader();
  const currentLocal = localStorage.getItem(SEARCH_TYPE)

  if (currentLocal === 'bySearch') {
    createSearchFetch(query, page)
      .then(res => {

        renderMoviesList(res); // how it renders HTML inside DOM?
        stopLoader();
      })
  } else if (currentLocal === 'byYear') {
    insertGenresToMoviesByYear(query, page)
      .then(res => {

        renderMoviesList(res); // how it renders HTML inside DOM?
        stopLoader();
      })
  } else if (currentLocal === 'byGenres') {
    insertGenresToMoviesByGenres(query, page)
      .then(res => {

        renderMoviesList(res); // how it renders HTML inside DOM?
        stopLoader();
      })
  } else {
    insertGenresToMovies(`&page=${page}`)
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