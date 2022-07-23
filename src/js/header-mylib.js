const header = document.querySelector('.header'); 
const form = document.querySelector('.input__wrapper'); 
const headerHome = document.querySelector('.home__btn'); 
const headerLibrary = document.querySelector('.my-library__btn'); 
const myLibraryBtnList = document.querySelector('.library-btn__list');
const logo = document.querySelector('.logo__list'); 

headerHome.addEventListener('click', onheaderHomeBtnClick);
logo.addEventListener('click', onheaderHomeBtnClick);

function onheaderHomeBtnClick() {
  header.classList.remove('header__my-library'); 
}

export function onMyLibraryBtnClick() {
  header.classList.add('header__my-library');
}
