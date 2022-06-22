import refs from './refs';
import { ifMyLibraryOpen } from './render-local-movies';
import { watchedRender } from './render-local-movies';
import { startLoader, stopLoader } from './loader.js';

refs.myLibraryBtn.addEventListener('click', switchCurrentLibrary);
refs.homeBtn.addEventListener('click', switchCurrentHome);

function switchCurrentLibrary(e) {
  const currentPage = e.target;
  currentPage.classList.add('current');
  refs.homeBtn.classList.remove('current');

  refs.searchForm.classList.add('is-hidden-header');
  refs.libraryBtnsList.classList.remove('is-hidden-header');

  ifMyLibraryOpen();

  refs.filterForm.classList.add('is-hidden-header');
  refs.pagination.classList.add('is-hidden-header');

  startLoader();
  stopLoader();

  refs.libraryBtnQueue.classList.remove('active');
  refs.libraryBtnWatched.classList.add('active');

  watchedRender();
}

function switchCurrentHome(e) {
  const currentPage = e.target;
  currentPage.classList.add('current');
  refs.myLibraryBtn.classList.remove('current');

  refs.searchForm.classList.remove('is-hidden-header');
  refs.libraryBtnsList.classList.add('is-hidden-header');
}
