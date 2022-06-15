import { Notify } from "notiflix";
const queueStoragedFilms = [];
const watchedStoragedFilms = [];
const queueHasFilmMessage = 'That film is already in queue';
const watchedHasFilmMessage = 'That film is already in watched';

export function addFilmToQueued (filmId) {
    localStorage.setItem("queued_films", queueStoragedFilms)

    if (localStorage.queued_films.includes(filmId)) {
        return Notify.warning(queueHasFilmMessage);
    } else {
        queueStoragedFilms.push(JSON.stringify(filmId));
        localStorage.setItem("queued_films", queueStoragedFilms)
    }
}

export function addFilmToWatched (filmId) {
    localStorage.setItem("watched_films", watchedStoragedFilms)

    if (localStorage.watched_films.includes(filmId)) {
        return Notify.warning(watchedHasFilmMessage);
    } else {
        watchedStoragedFilms.push(JSON.stringify(filmId));
        localStorage.setItem("watched_films", watchedStoragedFilms)
    }
}