const header = document.querySelector('.header'); // хедер
const form = document.querySelector('.input__wrapper'); // форма хедеру
const headerHome = document.querySelector('.home__btn'); // кнопка навігації Home
const headerLibrary = document.querySelector('.my-library__btn'); // кнопка навігації My library
const myLibraryBtnList = document.querySelector('.library-btn__list'); // кнопки хедеру My library Watched та Queue

headerHome.addEventListener('click', onheaderHomeBtnClick);
headerLibrary.addEventListener('click', onMyLibraryBtnClick);
logo.addEventListener('click', onheaderHomeBtnClick);

function onheaderHomeBtnClick() {
  form.classList.remove('is-hidden'); // з'являється форма
  header.classList.remove('header__my-library'); // видаляється фонове зображення сторінки My library
}

function onMyLibraryBtnClick() {
  header.classList.add('header__my-library'); // додається нове фонове зображення хедера
}