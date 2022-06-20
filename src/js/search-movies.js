import { getMoviesByName, getGenres } from './get-movies';
import movieListTpl from '../templates/list-of-movies.hbs';
import { Report } from 'notiflix/build/notiflix-report-aio';
import refs from './refs';
import {startLoader,stopLoader} from './loader.js';
import { renderButtons } from './pagination';

let page = 1;
let searchQuery = '';

refs.searchForm.addEventListener('submit', onMovieSearch);

async function onMovieSearch(event) {
    event.preventDefault();
    searchQuery = event.currentTarget.elements.searchQuery.value.trim();
   if (searchQuery === '') {
    return;
    };
    createSearchFetch(searchQuery);
    refs.searchForm.reset();
};

async function createSearchFetch(searchQuery) {
      try {
        const fetchedQuery = await getMoviesByName(page, searchQuery);
          clearGallery();
          
        if (fetchedQuery.results.length === 0) {
            onSearchFailure();
          };
    
          const genresList = await getGenres();
          
          renderButtons(fetchedQuery.page, fetchedQuery.total_pages); //// для Вадима ;)
          
  const fetchResult = fetchedQuery.results.map(movie => ({
    ...movie,
    release_date: movie.release_date.split('-')[0],
    genres: movie.genre_ids.map(id => genresList.genres.filter(el => el.id === id)).flat(),
  }));
       
          insertSearchedMovies(fetchResult);
    }
    catch (eror) {
console.log(eror)
    }; 
}

function insertSearchedMovies(result) {
        startLoader();
        result.map(element => {
        if (element.genres.length > 2) {
          const Obj = { name: 'Інше' };
          element.genres[2] = Obj;
          element.genres.length = 3;
        }
        });
        renderMoviesList(result);
stopLoader();
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