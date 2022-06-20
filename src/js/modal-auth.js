import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import authMarkup from '../templates/auth.hbs';

const authorizationBtn = document.querySelector('.btn-author-modal-open');

authorizationBtn.addEventListener('click', onBtnModalFormClick);

function onBtnModalFormClick(event) {
  event.preventDefault();
  instance.show();
}

const instance = basicLightbox.create(authMarkup());
