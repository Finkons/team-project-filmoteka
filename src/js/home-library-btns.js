import refs from './refs';

refs.myLibraryBtn.addEventListener('click', switchCurrentLibrary);
refs.homeBtn.addEventListener('click', switchCurrentHome);

function switchCurrentLibrary(e) {
  const currentPage = e.target;
  currentPage.classList.add('current');
  refs.homeBtn.classList.remove('current');

  refs.searchForm.classList.add('is-hidden-header');
  refs.libraryBtnsList.classList.remove('is-hidden-header');
}

function switchCurrentHome(e) {
  const currentPage = e.target;
  currentPage.classList.add('current');
  refs.myLibraryBtn.classList.remove('current');

  refs.searchForm.classList.remove('is-hidden-header');
  refs.libraryBtnsList.classList.add('is-hidden-header');
}
