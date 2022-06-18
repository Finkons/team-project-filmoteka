import { getPopularMovies } from './get-movies';
import moviesListPatern from '../templates/list-of-movies.hbs';
import refs from './refs';
import { getGenres } from './get-movies';
import { startLoader, stopLoader } from './loader.js';

let page = 1;
let lang = 'uk';

function renderMoviesList(movies) {
  const markup = moviesListPatern(movies)
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

async function insertGenresToMovies() {
  const data = await getPopularMovies(page, lang);
  const genresList = await getGenres(lang);
  return data.results.map(movie => ({
    ...movie,
    release_date: movie.release_date.split('-')[0],
    genres: movie.genre_ids
      .map(id => genresList.genres.filter(el => el.id === id))
      .flat(),
  }));
}

export function insertPopularMovies() {
  startLoader();
  insertGenresToMovies().then(res => {
    console.log(res);
    res.map(element => {
      if (element.genres.length > 2) {
        const Obj = {name: "Інше"};
        element.genres[2] = Obj;
        element.genres.length = 3
      }
    })
    renderMoviesList(res);
    stopLoader();
  }).catch(error => {
    console.log(error.message)
  })
}

insertPopularMovies()