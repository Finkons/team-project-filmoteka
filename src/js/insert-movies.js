import { getPopularMovies } from './get-movies';
import { getMovieGenre } from './movie-genres';

const refs = {
  galleryContainer: document.querySelector('.cards-collection'),
};

let page = 1;

function renderMoviesList(movies) {
  const markup = movies
    .map(movie => {
      const genreList = getMovieGenre(...movie.genre_ids)

      return `<li class="cards-collection-item">
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
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function insertPopularMovies() {
  getPopularMovies(page).then(data => {
    console.log(data.results);
    renderMoviesList(data.results);
  });
}

insertPopularMovies();
