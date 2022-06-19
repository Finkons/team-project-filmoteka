import refs from './refs';
import { getPopularMovies } from './get-movies';
import moviesListPagin from '../templates/pagination.hbs';
import { insertPopularMovies } from './insert-movies';
import { getMovieGenre } from './movie-genres';
import {startLoader,stopLoader} from './loader.js';
import {renderMoviesList} from './search-movies';

let currentPage = 1;
let totalPages = 0;
let searchQuery = '';
let btnTotal = 2;


function onBtnsClick(evt) {
    console.log(evt.target.classList)
    if (evt.target.nodeName !== 'BUTTON') {
        return;
    } else
    if (evt.target.classList.contains('arrow-left')) {
    currentPage -= 1;
    } else if (evt.target.classList.contains('arrow-right')) {
    currentPage += 1;
    }else if (evt.target.classList.contains('pagination-button')) {
        console.log(evt.target)
    currentPage = Number(evt.target.textContent);
    }

    clearPage(refs.paginationList);
    insertPopularMovies(currentPage);
    // renderPagesList();
    checkBtnOpacity();
}    


function checkBtnOpacity() {
    currentPage === 1
        ? refs.leftArrow.classList.add('visually-hidden')
        : refs.leftArrow.classList.remove('visually-hidden');
    currentPage === Number(refs.pageLast.textContent)
        ? refs.rightArrow.classList.add('visually-hidden')
        : refs.rightArrow.classList.remove('visually-hidden');
    if (document.body.clientWidth <= 320) {
        refs.prevDots.classList.add('visually-hidden');
        refs.afterDots.classList.add('visually-hidden');
        currentPage > 3
        ? refs.pageFirst.classList.add('visually-hidden')
        : refs.pageFirst.classList.remove('visually-hidden');
        onClickPage < Number(refs.pageLast.textContent) - 2
        ? refs.pageLast.classList.add('visually-hidden')
        : refs.pageLast.classList.remove('visually-hidden');
    } else {
        currentPage < 5
        ? refs.prevDots.classList.add('visually-hidden')
        : refs.prevDots.classList.remove('visually-hidden');
        currentPage > Number(refs.pageLast.textContent) - 4
        ? refs.afterDots.classList.add('visually-hidden')
        : refs.afterDots.classList.remove('visually-hidden');
    }
    }
    
function setLastPageNumber(totalPages) {
    console.log(totalPages)
    refs.pageLast.textContent = totalPages;
}

function currentBtn() {
    let activeBtns = refs.pagination.querySelectorAll('.pagination-button');
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

function renderPagesList(totalPages) {
    const pagesArr = [];
    for (let i = 1; i < totalPages; i += 1) {
        pagesArr.push({
            page: i
        })
    }
    const data = {
        pages: pagesArr,
        currentPage: currentPage
    }
    const markup = moviesListPagin(data)
    refs.pagination.insertAdjacentHTML('beforeend', markup);
    refs.pagination.addEventListener('click', onBtnsClick);
    // const start = currentPage - btnTotal;
    // const end = currentPage + btnTotal;
    // for (let i = start; i <= end; i += 1) {
    //     if (i > 1 && i < totalPages) {
    //     refs.paginationList.insertAdjacentHTML(
    //         'beforeend',
    //         `<li class=""><button class="pagination-button">${i}</button></li>`,
    //     );
    //     }
    // }
    }
    
renderPagesList(5);

