import refs from './refs';
import { getPopularMovies } from './get-movies';
import moviesListPagin from '../templates/list-of-movies.hbs';
import { getMoviesByName } from './get-movies';
import { getMovieGenre } from './movie-genres';
import {startLoader,stopLoader} from './loader.js';

const {
    pagination,
    paginationList,
    paginationBtn,
    pageFirst,
    pageLast,
    leftArrow,
    rightArrow,
    prevDots,
    afterDots,
} = refs;

let currentPage = 1;

async function onBtnsClick(evt) {
    
    try{
        if (evt.target.value === 'next') {
            currentPage += 1;
        } else if (evt.target.value === 'prev') {
            currentPage -= 1;
        }
    const fetchPage = await getPopularMovies(currentPage);
        startLoader();
        clearPage();
        stopLoader();
        newListOfMovies(fetchPage.results);
        checkBtnOpacity();
        setLastPageNumber(fetchPage.results.total_pages);
        currentBtn()
        getMovieGenre(fetchPage.results);
    }
    catch (error) {
        console.log(error)
    };
};

function newListOfMovies(movies) {
    const markupPag = moviesListPagin(movies);
    refs.galleryContainer.insertAdjacentHTML("beforeend", markupPag);
};

function checkBtnOpacity() {
currentPage === 1
    ? leftArrow.classList.add('visually-hidden')
    : leftArrow.classList.remove('visually-hidden');
currentPage === Number(pageLast.textContent)
    ? rightArrow.classList.add('visually-hidden')
    : rightArrow.classList.remove('visually-hidden');
if (document.body.clientWidth <= 320) {
    prevDots.classList.add('visually-hidden');
    afterDots.classList.add('visually-hidden');
    currentPage > 3
    ? pageFirst.classList.add('visually-hidden')
    : pageFirst.classList.remove('visually-hidden');
    onClickPage < Number(pageLast.textContent) - 2
    ? pageLast.classList.add('visually-hidden')
    : pageLast.classList.remove('visually-hidden');
} else {
    currentPage < 5
    ? prevDots.classList.add('visually-hidden')
    : prevDots.classList.remove('visually-hidden');
    currentPage > Number(pageLast.textContent) - 4
    ? afterDots.classList.add('visually-hidden')
    : afterDots.classList.remove('visually-hidden');
}
}

function setLastPageNumber(totalPages) {
    console.log(totalPages)
    pageLast.textContent = totalPages;
}

function currentBtn() {
    let activeBtns = pagination.querySelectorAll('.pagination-button');
    for (let i =0; i < activeBtns.length; i += 1) {
        if (Number(activeBtns[i].textContent) === currentPage) {
            activeBtns[i].classList.add('pagination__current-btn');
        } else if (Number(activeBtns[i].textContent) !== currentPage) {
            activeBtns[i].classList.remove('pagination__current-btn');
        }
    }
}

function clearPage() {
    refs.galleryContainer.innerHTML= '';
};

// pagination: document.querySelector('.pagination'),
// paginationList: document.querySelector('.pagination-list'),
// paginationBtn: document.querySelectorAll('.pagination-button'),
// pageFirst: document.querySelector('.first-button'),
// pageLast: document.querySelector('.last-button'),
// leftArrow: document.querySelector('#arrow-left'),
// rightArrow: document.querySelector('#arrow-right'),
// prevDots: document.querySelector('.js-previous-dots'),
// afterDots: document.querySelector('.js-after-dots'),
// refs.leftArrow.addEventListener('click', onBtnsClick);
// refs.rightArrow.addEventListener('click', onBtnsClick);
pageFirst.addEventListener('click', onBtnsClick);
pageLast.addEventListener('click', onBtnsClick);
leftArrow.addEventListener('click', onBtnsClick);
rightArrow.addEventListener('click', onBtnsClick);