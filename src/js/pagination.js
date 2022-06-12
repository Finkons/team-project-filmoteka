// import { onMovieSearch } from './search-movies';
// import { getMoviesByName } from './get-movies';

const refs = {
    pagination: document.querySelector('.pagination'),
    page1: document.querySelector('[data-page="1"]'),
    page2: document.querySelector('[data-page="2"]'),
    page3: document.querySelector('[data-page="3"]'),
    page4: document.querySelector('[data-page="4"]'),
    page5: document.querySelector('[data-page="5"]'),
    pageFirst: document.querySelector('.first-button'),
    pageLast: document.querySelector('.last-button'),
    leftArrow: document.querySelector('.arrow-left'),
    rightArrow: document.querySelector('.arrow-right'),
    prevDots: document.querySelector('#previous'),
    afterDots: document.querySelector('#after'),
}

let currentPage = 1;
// let btns = document.querySelectorAll('.pagination-button');

refs.prevDots.hidden = true;
refs.leftArrow.hidden = true;
refs.pageFirst.hidden = true;

const onBtnsClick = (evt) => {
    if (evt.target === evt.currentTarget)
    return
    const { page } = evt.target.dataset;
    currentPage = page;
    // getMoviesByName(page,searchQuery)
    console.log (page);
}

refs.pagination.addEventListener('click', onBtnsClick);