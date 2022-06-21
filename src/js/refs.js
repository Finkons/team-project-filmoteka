const refs = {
  // Header//
  searchBtn: document.querySelector('.button__search'),
  searchForm: document.querySelector('.search-form'),
  myLibraryBtn: document.querySelector('.my-library__btn'),
  homeBtn: document.querySelector('.home__btn'),
  logo: document.querySelector('.logo__list'),
  enLangBTN: document.getElementById('e-lang-en'),
  uaLangBTN: document.getElementById('e-lang-ua'),
  // Main //
  galleryContainer: document.querySelector('.cards-collection'),
  filterForm: document.querySelector('.search-filter-form'),
  pagination: document.querySelector('.pagination'),
  paginationList: document.querySelector('.pagination__list'),
  pageFirst: document.querySelector('.first-button'),
  pageLast: document.querySelector('.last-button'),
  leftArrow: document.querySelector('.arrow-left'),
  rightArrow: document.querySelector('.arrow-right'),
  prevDots: document.querySelector('.js-previous-dots'),
  afterDots: document.querySelector('.js-after-dots'),
  // My Library //
  libraryBtnsList: document.querySelector('.library-btn__list'),
  libraryBtnWatched: document.querySelector('.watched-btn'),
  libraryBtnQueue: document.querySelector('.queue-btn'),

  // Film Card //

  // Footer//
  teamContainer: document.querySelector('.team-container'),
  openModalBtn: document.querySelector('[data-modal-team-open]'),
  closeModalBtn: document.querySelector('[data-modal-team-close]'),
  modal: document.querySelector('[data-modal-team]'),
};
export default refs;
