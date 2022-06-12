import { getMoviesByName } from './get-movies';
import movieListTpl from '../templates/list-of-movies.hbs';
import { Report } from 'notiflix/build/notiflix-report-aio';

import {
    startLoader,
    stopLoader
} from './loader.js'

let page = 1;
let searchQuery = '';
let ganres = [];

const refs = {
    galleryContainer: document.querySelector('.cards-collection'),
    searchForm: document.querySelector('.search-form'),
    searchBtn: document.querySelector('.button__search'),
};

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
        console.log(fetchedQuery.results);
        if (fetchedQuery.results.length === 0) {
            onSearchFailure();
        };
        startLoader();
        stopLoader();
        renderMoviesList(fetchedQuery.results);
    }
    catch (eror) {
console.log(eror)
    };
    
};

function renderMoviesList(movies) {
    const markup = movieListTpl(movies);
    refs.galleryContainer.insertAdjacentHTML("beforeend", markup);
};


function clearGallery() {
    refs.galleryContainer.innerHTML= '';
}

function onSearchFailure() {
    Report.failure(
'Search Failure',
'Sorry, there is no movie matched your query. Please try again.',
               'Ok',
               {
                   svgColor: '#ff6b08',
                   buttonBackground: '#ff6b08',
                   backOverlayColor: 'linear-gradient(45deg, rgba(252,252,255,1) 0%, rgba(255,107,8,0.4458158263305322) 59%, rgba(0,0,0,0.3785889355742297) 100%)'
               },
);
}