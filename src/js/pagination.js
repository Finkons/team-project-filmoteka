import refs from './refs.js';
import { insertPopularMovies } from './insert-movies.js';

let searchQuery = ''; 
let currentPage = 1;
let totalPages = 0;
let btnTotal = 2;

export function paginationPage(data) {
  searchQuery = query;
  currentPage = data.page;
  clearPage(refs.paginationList);
  insertPopularMovies(currentPage, data);
  setLastPageNumber(data.total_pages);
  renderPagesList(data.total_pages);
  currentBtn();
  checkBtnOpacity();
}
function onBtnsClick(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  } else if (evt.target.classList.contains('arrow-left')) {
    currentPage -= 1;
  } else if (evt.target.classList.contains('arrow-right')) {
    currentPage += 1;
  } else if (evt.target.classList.contains('pagination-button')) {
    currentPage = Number(evt.target.textContent);
  }
  clearPage(refs.paginationList);
  insertPopularMovies(searchQuery,currentPage);
}
function checkBtnOpacity() {
  localStorage.setItem('current_page', currentPage)
  
  console.log(currentPage);
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
    currentPage < Number(refs.pageLast.textContent) - 2
      ? refs.pageLast.classList.add('visually-hidden')
      : refs.pageLast.classList.remove('visually-hidden');
  } else {
    currentPage > Number(refs.pageLast.textContent) - 4
      ? refs.afterDots.classList.add('visually-hidden')
      : refs.afterDots.classList.remove('visually-hidden');
      currentPage > Number(refs.pageLast.textContent) - 3
      ? refs.pageLast.classList.add('visually-hidden')
      : refs.pageLast.classList.remove('visually-hidden');
  }
}
export function renderButtons(currentPage, pagesCount, query) {
  setLastPageNumber(pagesCount);
  searchQuery = query;
  return renderPagesList(currentPage, pagesCount);
}
function setLastPageNumber(totalPages) {
  refs.pageLast.textContent = totalPages;
}
function clearPage() {
  refs.galleryContainer.innerHTML = '';
}
function renderPagesList(currentPage, totalPages) {
  refs.paginationList.innerHTML = '';
  const start = currentPage < 4 ? 1 : currentPage - btnTotal;
  let end = currentPage === totalPages ? totalPages : currentPage + btnTotal;
  end = end > totalPages ? totalPages : end;
  if (currentPage >= 4) {
    refs.paginationList.insertAdjacentHTML(
      'beforeend',
      `<button class="pagination-button first-button">1</button>`,
    );
  }
  if (currentPage > 4) {
    refs.paginationList.insertAdjacentHTML(
      'beforeend',
      `<span class="pagination-dots js-previous-dots">...</span>`,
    );
  }
  for (let i = start; i <= end; i += 1) {
      let classes = 'pagination-button';
      if (currentPage === i) {
        classes += ' pagination--current'
      }
      refs.paginationList.insertAdjacentHTML(
        'beforeend',
        `<li class=""><button class="${classes}">${i}</button></li>`,
      );
  }
  checkBtnOpacity();
}
refs.pagination.addEventListener('click', onBtnsClick);