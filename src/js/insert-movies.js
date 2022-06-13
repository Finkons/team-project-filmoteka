import { getPopularMovies } from './get-movies';
import moviesListPatern from '../templates/list-of-movies.hbs';
import refs from './refs';
import { getGenres } from './get-movies';

let page = 1;

function renderMoviesList(movies) {
  const markup = movies
    .map(movie => {
      const genreList = getMovieGenre(...movie.genre_ids);

      return `<li class="cards-collection-item" data-id=${movie.id}>
        <div class="card-poster">
  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" loading="lazy" height = "450 px" />
  <span class="card-vote-average">${movie.vote_average}</span>
    </div>
  <div class="card-info">
    <p class="card-title">${movie.title}</p>
    <p class="card-title">${genreList}</p>

    <p class="card-text"></p>
  </div>
</li>`;
    })
    .join('');
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