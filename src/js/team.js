import { teamItems } from './team-items.js';
import teamCardTpl from '../templates/templet-team.hbs';
import refs from './refs';

createTeamMarkup(teamItems);
function createTeamMarkup(teamItems) {
  const markup = teamCardTpl(teamItems);
  return refs.teamContainer.innerHTML = markup;
}

[...document.querySelectorAll('.team__item')].forEach((teamItem) => {
	teamItem.addEventListener("click", () => {
    // const teamItemClicked = document.querySelector('.team__item.clicked')
    // if(teamItemClicked) {
    //   teamItemClicked.classList.remove("clicked");
    // }
    teamItem.classList.toggle("clicked")});
});

refs.openModalBtn.addEventListener('click', toggleModalTeam);
refs.closeModalBtn.addEventListener('click', toggleModalTeam);

function toggleModalTeam() {
  document.body.classList.toggle('modal-open');
  refs.modal.classList.toggle('is-hidden');
}



