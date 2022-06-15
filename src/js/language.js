import { text } from './lang-text'
import refs from './refs';

refs.enLangBTN.addEventListener('click', setLang.bind(null, 'en'));
refs.uaLangBTN.addEventListener('click', setLang.bind(null, 'ua'));

function setLang(lang) {
  let par;
  if (!text.hasOwnProperty(lang)) return;
  if (window.hasOwnProperty('localStorage'))
    window.localStorage.setItem('lang', lang);
  for (par in text[lang]) {
    document.getElementById(par).innerText = text[lang][par];
  }
}
var lang = (window.hasOwnProperty('localStorage') && window.localStorage.getItem('lang', lang)) || 'en';
setLang(lang);

