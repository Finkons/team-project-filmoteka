
import { getPopularMovies } from './get-movies';
import { getMoviesByName } from './get-movies';
import { getMovieGenre } from './movie-genres';

const refs = {
    // paginationList: document.querySelector('.pagination-list'),
    // paginationBtn: document.querySelectorAll('.pagination-button'),
    // pageFirst: document.querySelector('.first-button'),
    // pageLast: document.querySelector('.last-button'),
    leftArrow: document.querySelector('#arrow-left'),
    rightArrow: document.querySelector('#arrow-right'),
    // prevDots: document.querySelector('.js-previous-dots'),
    // afterDots: document.querySelector('.js-after-dots'),
}


let nextPage = 1;

async function onBtnsClick(evt) {
    console.log(evt.target.value)
    if (evt.target.value === 'next') {
        nextPage = nextPage + 1;
        console.log('next', nextPage)
    } else if (evt.target.value === 'prev') {
        nextPage = nextPage - 1;
        console.log('prev', nextPage)
    }
    document.querySelector('.cards-collection').remove();

    
    await getPopularMovies(nextPage).then(({ results }) => {
        let ul = document.createElement('ul');
        ul.classList.add('list', 'cards-collection');

        const newListOfMovies = results.map((movie) => {
            return `<li class='cards-collection-item' data-id=${movie.id}>
            <div class='card-poster'>
                <img
                    src='https://image.tmdb.org/t/p/w500${movie.poster_path}'
                    alt='${movie.title}'
                    loading='lazy'
                />
                <span class='card-vote-average'>${movie.vote_average}</span>
            </div>
                <div class='card-info'>
                    <p class='card-title'>${movie.title}</p>
                    <p class='card-text'> ${movie.name} ${movie.release_date}</p></p>
                </div>
            </li>`

            
        }).join('');
        ul.insertAdjacentHTML('afterbegin', newListOfMovies);

        let galeryContainer = document.querySelector('#gallery-section');
        galeryContainer.appendChild(ul);
    });
}


const prevBtn = document.getElementById('arrow-left');
const nextBtn = document.getElementById('arrow-right');
console.log(prevBtn)
console.log(nextBtn)

prevBtn.addEventListener('click', onBtnsClick);
nextBtn.addEventListener('click', onBtnsClick);