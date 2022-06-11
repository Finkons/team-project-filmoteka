import { teamItems } from './team-items.js';

// import teamCardTpl from './templates/templet-team.hbs';
// export default refs; дописать всем refs
const teamContainer = document.querySelector('.team-container');
const teamMarkup = createTeamMarkup(teamItems);

function createTeamMarkup(teamItems) {
    return teamItems
    .map(({photo, name, family, description, rol}) => {
        return `
        
        <div class="team__item">
        
        <div class="front">
          <img
            class="team__image"
            src="${photo}"
            alt="${name}"
          />
          <div class="team-meta">
          <p class="team__item-title">${name}</p>
          <p class="team__item-title">${family}</p>
          <p class="team__item-text">${rol}</p>
      </div>   
          
          <div class="back">
          <p class="team__item-title">${name}</p>
          <p class="team__item-title">${family}</p>
          <p class="team__item-text">${description}</p>
          </div>
      
          </div>
          </div>`
        })
        .join('');
}
// function createTeamMarkup(teamItems) {
//   const markup = teamCardTpl(teamItems);
//   return teamContainer.innerHTML = markup;
// }

teamContainer.insertAdjacentHTML('beforeend', teamMarkup);

[...document.querySelectorAll('.team__item')].forEach((teamItem) => {
	teamItem.addEventListener("click", () => teamItem.classList.toggle("clicked"));
});




