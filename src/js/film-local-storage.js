const queueStoragedFilms = JSON.parse(localStorage.getItem('queued_films')) || [];
const watchedStoragedFilms = JSON.parse(localStorage.getItem('watched_films')) || [];

export function addFilmToQueued(filmId) {
    localStorage.setItem("queued_films", queueStoragedFilms);
    if (localStorage.getItem('queued_films').includes(filmId)) {
        queueStoragedFilms.splice(queueStoragedFilms.indexOf(filmId), 1);
    } else {
        queueStoragedFilms.push(filmId);
    }
    localStorage.setItem("queued_films", JSON.stringify(queueStoragedFilms));
}

export function addFilmToWatched (filmId) {
    localStorage.setItem("watched_films", watchedStoragedFilms)
    if (localStorage.getItem('watched_films').includes(filmId)) {
        watchedStoragedFilms.splice(watchedStoragedFilms.indexOf(filmId), 1)
    } else {
        watchedStoragedFilms.push(filmId);
    }
    localStorage.setItem("watched_films", JSON.stringify(watchedStoragedFilms));
}