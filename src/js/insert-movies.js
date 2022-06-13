import { getPopularMovies } from './get-movies';
import { getMovieGenre } from './movie-genres';
import moviesListPatern from '../templates/list-of-movies.hbs';
import refs from './refs';

let page = 1;

function renderMoviesList(movies) {
  const markup = moviesListPatern(movies)
    // .map(movie => {
    //   const genreList = getMovieGenre(...movie.genre_ids)
    // })
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function insertPopularMovies() {
  getPopularMovies(page).then(data => {
  renderMoviesList(data.results);
  });
}

insertPopularMovies();