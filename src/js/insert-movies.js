import { getPopularMovies } from './get-movies';
import moviesListPatern from '../templates/list-of-movies.hbs';
import refs from './refs';
import { getGenres } from './get-movies';

let page = 1;

function renderMoviesList(movies) {
  const markup = moviesListPatern(movies)
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function insertGenresToMovies() {
  return getPopularMovies(page).then(data => {
    return getGenres().then(genresList => {

        return data.results.map(movie => ({
          ...movie,
          release_date: movie.release_date.split('-')[0],
          genres: movie.genre_ids
            .map(id => genresList.genres.filter(el => el.id === id))
            .flat(),
        }))
    })
  })
}

export function insertPopularMovies() {
  insertGenresToMovies().then(
    renderMoviesList
  ).catch(error => {
    console.log (error.message)
  })
}

insertPopularMovies()