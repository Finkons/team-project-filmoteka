
import { getMoviesById } from './get-movies';
import { getMoviesTrailer } from './trailer-api';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { startLoader,stopLoader } from './loader';


export async function watchFilmTrailer(filmId) {
    try {
        const resultData = await getMoviesById(filmId);
        getMovieTitle(resultData.data);
    }
    catch (error) {
        console.log(error);
}
};


function getMovieTitle(result) {
    const trailerTitle = result.title.replaceAll(' ', '+').concat('+trailer');
  onTrailerClick (trailerTitle);
};


async function onTrailerClick (movieTitle) {
    try {
        const youTubeQuery = await getMoviesTrailer(movieTitle);
        startLoader();
        const youTubeData = youTubeQuery.items;
        const videoData = youTubeData[0].id.videoId;
        renderTrailer(videoData);
    }
    catch (eror) {
        console.log(eror);
    };
};

let instance;

function renderTrailer(videoId) {
    const markup = `<iframe width="420" height="315" src="http://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    instance = basicLightbox.create(markup);
    stopLoader();
    instance.show();
};

