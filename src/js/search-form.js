import { getMovieGenre } from './movie-genres';
import { getGenres, API_KEY } from './get-movies';
import moviesListPatern from '../templates/list-of-movies.hbs';

import Notiflix from 'notiflix';

const galleryEl = document.querySelector('.cards-collection');
const formEl = document.querySelector('.genre-search');
const searchGenreEl = document.querySelector('#genres');

    renderGenresList();

let genresList;

formEl.addEventListener('click', (event) => {
    const formValue = event.target;
    event.preventDefault();

if (formValue.id === 'years') {
    
    if (formValue.value !== 'year') {
        onClickSearchFormBtn();
        Notiflix.Notify.success(`Hooray! Here your films by ${formValue.value} year!`);

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${formValue.value}-01-01&primary_release_date.lte=${formValue.value}-12-31`).then((response) => {
            return response.json();
        })
            .then(({results, total_results}) => {

                clearGallery();

                markupAfterSearching(results);

                return;
            
            });
    }}

    
    if (formValue.id === 'genres') {

        let genreId;

        if (formValue.value !== 'genres') {
                    Notiflix.Notify.success(`Hooray! Here your ${formValue.value} movies!`);

            for (const el of genresList) {

                if (el.name === formValue.value) {
                    genreId = el.id;
                }
            }

            onClickSearchFormBtn();

            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${genreId}`).then((response) => {
                return response.json();
            })
                .then(({ results }) => {
                    clearGallery();
                    markupAfterSearching(results);

                    return;
                });
        }
    }

    if (formValue.id === 'popularity') {

        if (formValue.value !== 'option') {
            Notiflix.Notify.success(`Hooray! We found most popular movies!`);

            onClickSearchFormBtn();


            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${formValue.value}.desc&include_adult=false`).then((response) => {
                return response.json();
            })
                .then(({ results }) => {

                    clearGallery();
                    markupAfterSearching(results);
                    return;

                });
        }
    }

    formEl.reset();

})

const searchBtnOpen = document.querySelector('.search-form-btn');
const searchBackdrop = document.querySelector('.search-form__wrap');

searchBtnOpen.addEventListener('click', onClickSearchFormBtn)

function onClickSearchFormBtn() {
    searchBackdrop.classList.toggle('is-open');
}



function clearGallery() {
    galleryEl.innerHTML = '';
}

async function renderGenresList() {

    const resp = await getGenres();
    genresList = resp.genres;
    const genresItems = genresList.map(({ name }) => {
    return `<option value="${name}">${name}</option>`
}).join('');
searchGenreEl.insertAdjacentHTML('beforeend', genresItems)
}

function markupAfterSearching(movies) {

    const film = moviesListPatern(movies);

    const { id, title, poster_path, overview, release_date: dateOf, genre_ids: genresItems, vote_average } = movies;
    // const dateOf = release_date.slice(0, 4);
    // const genresItems = getMovieGenre(...genre_ids);
//      const film = movies.map(({ id, title, poster_path, overview, release_date, genre_ids, vote_average }) => {
//         const dateOf = release_date.slice(0, 4);
                
//         const genresItems = getMovieGenre(...genre_ids);
//         return `<li class="cards-collection-item" data-id="${id}">
//         <div class="card-poster">
//   <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" loading="lazy" height = "450 px" />
//   <span class="card-vote-average">${vote_average}</span>
//     </div>
//   <div class="card-info">
//     <p class="card-title">${title}</p>
//     <p class="card-title">${genresItems} | ${dateOf}</p>

//     <p class="card-text"></p>
//   </div>
// </li>`}).join('');

    return galleryEl.insertAdjacentHTML('beforeend', film)
}

