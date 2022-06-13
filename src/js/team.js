import { teamItems } from './team-items.js';
import teamCardTpl from '../templates/templet-team.hbs';
// export default refs; дописать всем refs
const teamContainer = document.querySelector('.team-container');
createTeamMarkup(teamItems);
function createTeamMarkup(teamItems) {
  const markup = teamCardTpl(teamItems);
  console.log(markup);
  return teamContainer.innerHTML = markup;
}

[...document.querySelectorAll('.team__item')].forEach((teamItem) => {
	teamItem.addEventListener("click", () => teamItem.classList.toggle("clicked"));
});




