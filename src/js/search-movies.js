import { getMoviesByName, getGenres } from './get-movies';
import movieListTpl from '../templates/list-of-movies.hbs';
import { Report } from 'notiflix/build/notiflix-report-aio';
import refs from './refs';
import { startLoader, stopLoader } from './loader.js';
import { renderButtons } from './pagination';
import { langCurrent } from './language';
import { addLangGenres, releaseDateCheck } from './insert-movies.js';
import { otherGenresTemplate } from './render-local-movies';

let page = 1;
let searchQuery = '';
refs.searchForm.addEventListener('submit', onMovieSearch);

function onMovieSearch(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (searchQuery === '') {
    return;
  };
  createSearchFetch(searchQuery, 1); 
  refs.searchForm.reset();
};

export async function createSearchFetch(searchQuery,page) {
  try {
    const fetchedQuery = await getMoviesByName(searchQuery,page);
    clearGallery();
    if (fetchedQuery.results.length === 0) {
      onSearchFailure();
    };
    renderButtons(fetchedQuery.page, fetchedQuery.total_pages, searchQuery); 
    localStorage.setItem('current_page', 1);
    const fetchResult = fetchedQuery.results.map(movie => ({
      ...movie,
      release_date: releaseDateCheck(movie),
      genres: addLangGenres(movie),
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
      const Obj = otherGenresTemplate();
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
  refs.galleryContainer.innerHTML = '';
};

function onSearchFailure() {
  Report.failure(
    'Search Failure',
    'Sorry, there is no movie matched your query. Please try again.',
    'Ok');
};