import refs from './refs';
import { getPopularMovies } from './get-movies';
import moviesListPagin from '../templates/list-of-movies.hbs';
import { getMoviesByName } from './get-movies';
import { getMovieGenre } from './movie-genres';
import {startLoader,stopLoader} from './loader.js';

let nextPage = 1;

async function onBtnsClick(evt) {
    if (evt.target.value === 'next') {
        nextPage += 1;
    } else if (evt.target.value === 'prev') {
        nextPage -= 1;
    }
    try{
    const fetchPage = await getPopularMovies(nextPage);
        startLoader();
        clearPage();
        
        stopLoader();
        newListOfMovies(fetchPage.results);
    }
    catch (error) {
        console.log(error)
    };
};

function newListOfMovies(movies) {
    console.log(movies)
    const markupPag = moviesListPagin(movies);
    refs.galleryContainer.insertAdjacentHTML("afterbegin", markupPag);
};

function clearPage() {
    refs.galleryContainer.innerHTML= '';
};

refs.leftArrow.addEventListener('click', onBtnsClick);
refs.rightArrow.addEventListener('click', onBtnsClick);