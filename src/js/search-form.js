import { getGenres, API_KEY } from './get-movies';
import { startLoader, stopLoader } from './loader.js';
import moviesListPatern from '../templates/list-of-movies.hbs';
import Notiflix from 'notiflix';
import axios from 'axios';
import { langCurrent } from './language';
import { paginationPage, renderButtons } from './pagination';


const BASE_URL = "https://api.themoviedb.org/3/discover/movie?";

const galleryEl = document.querySelector('.cards-collection');
const formEl = document.querySelector('.genre-search');
const searchGenreEl = document.querySelector('#genres');
const searchBtnOpen = document.querySelector('.search-btn--open');
const searchBtnClose = document.querySelector('.search-btn--close');
const searchBackdrop = document.querySelector('.search-form__wrap');

renderGenresList();

let genresList;
export const SEARCH_TYPE = 'current-search-fetch';

formEl.addEventListener('change', (event) => {
    const formValue = event.target;
    event.preventDefault();

if (formValue.id === 'years') {
    if (formValue.value !== 'year') {
        startLoader();
        onClickSearchBtnClose();
        Notiflix.Notify.success(`Hooray! Here your films by ${formValue.value} year!`);
        clearGallery();
        insertGenresToMoviesByYear(formValue.value);
        localStorage.setItem(SEARCH_TYPE, "byYear");
        stopLoader();
    }}

    
    if (formValue.id === 'genres') {
        let genreId;

        if (formValue.value !== 'genres') {
            startLoader();
            Notiflix.Notify.success(`Hooray! Here your ${formValue.value} movies!`);
            for (const el of genresList) {

                if (el.name === formValue.value) {
                    
                    console.log(formValue.value);
                    genreId = el.id;
                    insertGenresToMoviesByGenres(genreId);
                    localStorage.setItem(SEARCH_TYPE, "byGenres");

                    onClickSearchBtnClose();
                }
            }
            clearGallery();
            stopLoader()
        }
    }

//     if (formValue.id === 'popularity') {
//         if (formValue.value === 'popularity') {
//     startLoader();
//             onClickSearchBtnClose();
//             Notiflix.Notify.success(`Hooray! We found most popular movies!`);
//             clearGallery();
//             insertGenresToMoviesByPopularity();
//             localStorage.setItem(SEARCH_TYPE, "byPopularity");

//             stopLoader();
// }
//     }
    formEl.reset();
})


searchBtnOpen.addEventListener('click', onClickSearchBtnOpen)
searchBtnClose.addEventListener('click', onClickSearchBtnClose)
function onClickSearchBtnOpen() {
    searchBackdrop.classList.add('is-open');
}

function onClickSearchBtnClose() {
    searchBackdrop.classList.remove('is-open');
}


function clearGallery() {
    galleryEl.innerHTML = '';
}

async function renderGenresList() {

    const response = await getGenres(langCurrent());

    genresList = response.genres;
    const genresItems = genresList.map(({ name }) => {
    return `<option value="${name}">${name}</option>`
}).join('');
searchGenreEl.insertAdjacentHTML('beforeend', genresItems)
}


async function getMoviesByGenres(genreId, page = 1) {
    const url = `${BASE_URL}api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`;
    const response = await axios.get(url);
    return response.data;
};

async function getMoviesByYear(year, page = 1) {
    const url = `${BASE_URL}api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`;
    const response = await axios.get(url);
    return response.data;
}

// async function getMoviesByPopularity( page = 1) {
//     const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&include_adult=false&page=${page}`;
//     const response = await axios.get(url);
//     return response.data;
// }


// export async function insertGenresToMoviesByPopularity(page) {
//     try {
//         const fetchTrendMovie = await getMoviesByPopularity(page);
//         const genresList = await getGenres(langCurrent());
//         renderButtons(fetchTrendMovie.page, 500, query); //// для Вадима ;) // paginationFunction(currentPage, totalPages, searchQuery)

//         const fetchRes = fetchTrendMovie.results.map(movie => ({
//             ...movie,
//             release_date: movie.release_date.split('-')[0],
//             genres: movie.genre_ids
//                 .map(id => genresList.genres.filter(el => el.id === id))
//                 .flat(),
//         }));
//         markupMoviesByPopularity(fetchRes);
//     }
//     catch (error) {
//         console.log(error.message);
// }
// }

// function markupMoviesByPopularity(res) {
//         res.map(element => {
//             if (element.genres.length > 2) {
//                 const Obj = { name: "Other" };
//                 element.genres[2] = Obj;
//                 element.genres.length = 3
//             }
//         })
//         return renderMoviesList(res);
//     }


export async function insertGenresToMoviesByGenres(id, page) {
    try {
        const fetchedGenres = await getMoviesByGenres(id, page);
    clearGallery();
    const genresList = await getGenres(langCurrent());
    renderButtons(fetchedGenres.page, 500, id); //// для Вадима ;) // paginationFunction(currentPage, totalPages, searchQuery)
    const fetchRes = fetchedGenres.results.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
            .map(id_1 => genresList.genres.filter(el => el.id === id_1))
            .flat(),
    }));
    markupMoviesByGenres(fetchRes);
    }
    catch (error) {
        console.log(error);
    }
}

function markupMoviesByGenres(id) {
        id.map(element => {
    if (element.genres.length > 2) {
        const Obj = {name: "Other"};
        element.genres[2] = Obj;
        element.genres.length = 3
    }
    })
        return renderMoviesList(id);
}


export async function insertGenresToMoviesByYear(year, page) {
    try {
        const fetchedYear = await getMoviesByYear(year, page);
        clearGallery();
        const genresList = await getGenres(langCurrent());
        renderButtons(fetchedYear.page, 500, year); //// для Вадима ;) // paginationFunction(currentPage, totalPages, searchQuery)
        const fetchRes = fetchedYear.results.map(movie => ({
            ...movie,
            release_date: movie.release_date.split('-')[0],
            genres: movie.genre_ids
                .map(id => genresList.genres.filter(el => el.id === id))
                .flat(),
        }));
        markupMoviesByYear(fetchRes);
    }
    catch (error) {
        console.log(error);
    }
}

function markupMoviesByYear(year) {
    year.map(element => {
    if (element.genres.length > 2) {
        const Obj = {name: "Other"};
        element.genres[2] = Obj;
        element.genres.length = 3
    }
    })
        renderMoviesList(year);
};


function renderMoviesList(movies) {
    const markup = moviesListPatern(movies)
    galleryEl.insertAdjacentHTML('beforeend', markup);
}



