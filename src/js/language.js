import { text } from './lang-text'
import refs from './refs';

refs.enLangBTN.addEventListener('click', setLang.bind(null, 'en'));
refs.uaLangBTN.addEventListener('click', setLang.bind(null, 'ua'));

const inputPlaceholder = document.querySelector('.header__input')

console.log(inputPlaceholder.placeholder);
function setLang(lang) {
  let par;
  if (!text.hasOwnProperty(lang)) return;
  if (window.hasOwnProperty('localStorage'))
    window.localStorage.setItem('lang', lang);
  for (par in text[lang]) {
    document.getElementById(par).innerText = text[lang][par];
    if (lang === 'ua') {
      inputPlaceholder.placeholder = 'Пошук Фільму'
      refs.enLangBTN.style.cssText = `color: white;`
      refs.uaLangBTN.style.cssText = `color: orange;
  `;
    } else {
      inputPlaceholder.placeholder = 'Search Movies'
      refs.uaLangBTN.style.cssText = `color: white;`
      refs.enLangBTN.style.cssText = `color: orange;`
    }
  }

}
var lang = (window.hasOwnProperty('localStorage') && window.localStorage.getItem('lang', lang)) || 'en';
setLang(lang);


