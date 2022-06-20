import { getMoviesByName } from './get-movies';
import movieListTpl from '../templates/list-of-movies.hbs';
import { Report } from 'notiflix/build/notiflix-report-aio';
import refs from './refs';
import {startLoader,stopLoader} from './loader.js';
import { paginationPage } from './pagination.js';


let page = 1;
let searchQuery = '';

refs.searchForm.addEventListener('submit', onMovieSearch);

async function onMovieSearch(event) {
    event.preventDefault();
    searchQuery = event.currentTarget.elements.searchQuery.value.trim();
   if (searchQuery === '') {
    return;
    };
    refs.searchForm.reset();
    try {
        const fetchedQuery = await getMoviesByName(page, searchQuery);
        clearGallery();
        if (fetchedQuery.results.length === 0) {
            onSearchFailure();
        };
        startLoader();
        stopLoader();
        // paginationPage(data);
        renderMoviesList(fetchedQuery.results);
    }
    catch (eror) {
console.log(eror)
    };  
};

export function renderMoviesList(movies) {
    const markup = movieListTpl(movies);
    refs.galleryContainer.insertAdjacentHTML("beforeend", markup);
};


function clearGallery() {
    refs.galleryContainer.innerHTML= '';
};

function onSearchFailure() {
    Report.failure(
'Search Failure',
'Sorry, there is no movie matched your query. Please try again.',
'Ok',);
};