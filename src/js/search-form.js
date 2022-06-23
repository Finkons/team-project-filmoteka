import { getGenres, API_KEY } from './get-movies';
import refs from './refs';
import { otherGenresTemplate } from './render-local-movies';
import { addLangGenres, releaseDateCheck } from './insert-movies.js';
import { startLoader, stopLoader } from './loader.js';
import moviesListPatern from '../templates/list-of-movies.hbs';
import Notiflix from 'notiflix';
import axios from 'axios';
import { langCurrent } from './language';
import { renderButtons } from './pagination';

export const SEARCH_TYPE = 'current-search-fetch';

const BASE_URL = "https://api.themoviedb.org/3/discover/movie?";
const formEl = document.querySelector('.genre-search');
const searchGenreEl = document.querySelector('#genres');
const searchBtnOpen = document.querySelector('.search-btn--open');
const searchBtnClose = document.querySelector('.search-btn--close');
const searchBackdrop = document.querySelector('.search-form__wrap');

formEl.addEventListener('change', onSearchFormChange);
searchBtnOpen.addEventListener('click', onClickSearchBtnOpen);
searchBtnClose.addEventListener('click', onClickSearchBtnClose);

const currentLang = localStorage.getItem('lang');

renderGenresList();

let genresList;

function onSearchFormChange(event) {
    const formValue = event.target;
    event.preventDefault();
if (formValue.id === 'years') {

    if (formValue.value !== 'year') {
        startLoader();
        onClickSearchBtnClose();
        let pageLang = localStorage.getItem('lang');
        if (pageLang === 'ua') {
        Notiflix.Notify.success(`Фільми ${formValue.value}року!`);
        } else {
        Notiflix.Notify.success(`Hooray! Here your films by ${formValue.value} year!`);
        }
        clearGallery();
        insertGenresToMoviesByYear(formValue.value, currentLang);
        localStorage.setItem(SEARCH_TYPE, "byYear");
        stopLoader();
    }}
    if (formValue.id === 'genres') {
        let genreId;
        if (formValue.value !== 'genres') {
            startLoader();
            for (const el of genresList) {
                if (el.name === formValue.value) {
                    genreId = el.id;
                    insertGenresToMoviesByGenres(genreId, currentLang);
                    localStorage.setItem(SEARCH_TYPE, "byGenres");
                    onClickSearchBtnClose();
                    let pageLang = localStorage.getItem('lang');

                    if (pageLang === 'ua') {
            Notiflix.Notify.success(`Фільми по жанру ${formValue.value}!`);
            } else {
            Notiflix.Notify.success(`Hooray! Here your ${formValue.value} movies!`);
        }
                }
            }
            clearGallery();
            stopLoader()
        }
    }
    formEl.reset();
}


function onClickSearchBtnOpen() {
    searchBackdrop.classList.add('is-open');
}

function onClickSearchBtnClose() {
    searchBackdrop.classList.remove('is-open');
}


function clearGallery() {
    refs.galleryContainer.innerHTML = '';
}

refs.enLangBTN.addEventListener('click', renderGenresList)
refs.uaLangBTN.addEventListener('click', renderGenresList)



async function renderGenresList(lang) {
    searchGenreEl.innerHTML = '';
    let pageLang = localStorage.getItem('lang');
    if (pageLang === 'ua') {
        lang = `uk`;
    } else {
        lang = `en`;    
    }
    const response = await getGenres(lang);
    genresList = response.genres;
    const genresItems = genresList.map(({ name }) => {
    return `<option value="${name}">${name}</option>`
    }).join('');
    lang === `uk` ? searchGenreEl.insertAdjacentHTML('beforeend', `<option id="all-genres-lang" value="genres">всі жанри</option>` + genresItems) : searchGenreEl.insertAdjacentHTML('beforeend', `<option id="all-genres-lang" value="genres">all genres</option>` + genresItems);
}


function renderMoviesList(movies) {
    const markup = moviesListPatern(movies)
    refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}


async function getMoviesByGenres(genreId, page = 1, lang) {
    let pageLang = localStorage.getItem('lang');
    if (pageLang === 'ua') {
    lang = `uk`;
    } else {
    lang = `en`;
    }
    const url = `${BASE_URL}api_key=${API_KEY}&language=${lang}&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`;
    const response = await axios.get(url);
    return response.data;
};

async function getMoviesByYear(year, page = 1, lang) {
    let pageLang = localStorage.getItem('lang');
    if (pageLang === 'ua') {
    lang = `uk`;
    } else {
    lang = `en`;
    }
    const url = `${BASE_URL}api_key=${API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`;
    const response = await axios.get(url);
    return response.data;
}


export async function insertGenresToMoviesByGenres(id, page) {
    try {
    const fetchedGenres = await getMoviesByGenres(id, page);
    clearGallery();
        const genresList = await getGenres(langCurrent());
        const totalPages = fetchedGenres.total_pages;
        totalPages > 500 ? renderButtons(fetchedGenres.page, 500, id) : renderButtons(fetchedGenres.page, fetchedGenres.total_pages-1, id);
    const fetchRes = fetchedGenres.results.map(movie => ({
        ...movie,
        release_date: releaseDateCheck(movie),
        genres: addLangGenres(movie),
    }));
    markupMoviesWithParams(fetchRes);
    }
    catch (error) {
        console.log(error);
    }
}

function markupMoviesWithParams(searchParam) {
        searchParam.map(element => {
    if (element.genres.length > 2) {
        const Obj = otherGenresTemplate();
        element.genres[2] = Obj;
        element.genres.length = 3
    }
    })
        return renderMoviesList(searchParam);
}


export async function insertGenresToMoviesByYear(year, page) {
    try {
        const fetchedYear = await getMoviesByYear(year, page);
        clearGallery();
        const genresList = await getGenres(langCurrent());
        const totalPages = fetchedYear.total_pages;
        totalPages > 500 ? renderButtons(fetchedYear.page, 500, year) : renderButtons(fetchedYear.page, fetchedYear.total_pages-1, year);
        const fetchRes = fetchedYear.results.map(movie => ({
            ...movie,
            release_date: releaseDateCheck(movie),
            genres: addLangGenres(movie),
        }));
        markupMoviesWithParams(fetchRes);
    }
    catch (error) {
        console.log(error);
    }
}

function markupMoviesWithParams(searchParam) {
    searchParam.map(element => {
    if (element.genres.length > 2) {
        const Obj = otherGenresTemplate();
        element.genres[2] = Obj;
        element.genres.length = 3
    }
    })
        renderMoviesList(searchParam);
};
