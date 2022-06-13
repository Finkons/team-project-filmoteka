import { getMovieGenre } from './movie-genres';
import { genres } from './movie-genres';


const API_KEY = '250f014fd6a936550e378176122f5d39';

const galleryEl = document.querySelector('.cards-collection');
const searchGenreEl = document.querySelector('#genres');
const searchYearEl = document.querySelector('#years');
const searchPopularityEl = document.querySelector('#popularity');

renderGenresList(genres);


searchPopularityEl.addEventListener('click', (event) => {
    event.preventDefault();
    const searchPopularity = searchPopularityEl.value;

    if (searchPopularity !== 'option') {
        clearGallery();

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${searchPopularity}.desc`).then((response) => {
            return response.json();
        })
            .then(({ results }) => {

                const film = results.map(({ id, title, poster_path, popularity, release_date, genre_ids, vote_average, vote_count }) => {
                    const dateOf = release_date.slice(0, 4);
                
                    const genresList = getMovieGenre(...genre_ids);

                    return `<li class="cards-collection-item">
        <div class="card-poster">
  <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" loading="lazy" height = "450 px" />
  <span class="card-vote-average">${vote_average}</span>
    </div>
  <div class="card-info">
    <p class="card-title">${title}</p>
    <p class="card-title">${genresList} | ${dateOf}</p>

    <p class="card-text"></p>
  </div>
</li>`}).join('');

                return galleryEl.insertAdjacentHTML('beforeend', film)
            });
    }
    
})



searchYearEl.addEventListener('click', (event) => {
    event.preventDefault();
    const searchYear = searchYearEl.value;

    if (searchYearEl.value !== 'year') {
        clearGallery();

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${searchYear}-01-01&primary_release_date.lte=${searchYear}-12-31`).then((response) => {
            return response.json();
        })
            .then(({ results }) => {


                const film = results.map(({ id, title, poster_path, overview, release_date, genre_ids, vote_average }) => {
                    const dateOf = release_date.slice(0, 4);
                
                    const genresList = getMovieGenre(...genre_ids);

                    const genreName = [];
                    for (const el of genresList) {
                        for (const gen of genre_ids) {
                            if (el.id === gen) {
                                genreName.push(el.name)
                            }
                        }
                    }
                    return `<li class="cards-collection-item">
        <div class="card-poster">
  <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" loading="lazy" height = "450 px" />
  <span class="card-vote-average">${vote_average}</span>
    </div>
  <div class="card-info">
    <p class="card-title">${title}</p>
    <p class="card-title">${genresList} | ${dateOf}</p>

    <p class="card-text"></p>
  </div>
</li>`}).join('');

                return galleryEl.insertAdjacentHTML('beforeend', film)
            });
    }
    
})


searchGenreEl.addEventListener('click', (event) => {
    event.preventDefault();
    const searchGenre = searchGenreEl.value;
    let genreId;

    if (searchGenreEl.value !== 'genres') {
        for (const el of genres) {

            if (el.name === searchGenre) {
                genreId = el.id;
            }
        }

        clearGallery();

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${genreId}`).then((response) => {
            return response.json();
        })
            .then(({ results }) => {

                console.log(results);

                const film = results.map(({ id, title, poster_path, overview, release_date, genre_ids, vote_average }) => {
                    const dateOf = release_date.slice(0, 4);
                
                    const genresList = getMovieGenre(...genre_ids);
                    return `<li class="cards-collection-item">
        <div class="card-poster">
  <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" loading="lazy" height = "450 px" />
  <span class="card-vote-average">${vote_average}</span>
    </div>
  <div class="card-info">
    <p class="card-title">${title}</p>
    <p class="card-title">${genresList} | ${dateOf}</p>

    <p class="card-text"></p>
  </div>
</li>`}).join('');

                return galleryEl.insertAdjacentHTML('beforeend', film)
            });
    }
    
})

function clearGallery() {
    galleryEl.innerHTML = '';
}

function renderGenresList(obj) {
    const genresList = obj.map(({ name }) => {
    return `<option value="${name}">${name}</option>`
}).join('');
searchGenreEl.insertAdjacentHTML('beforeend', genresList)
}

