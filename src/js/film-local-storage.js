const queueStoragedFilms = [];
const watchedStoragedFilms = [];

export function addFilmToQueued (filmId) {
    localStorage.setItem("queued_films", queueStoragedFilms)

    if (localStorage.queued_films.includes(filmId)) {
        queueStoragedFilms.splice(queueStoragedFilms.indexOf(filmId), 1)
    } else {
        queueStoragedFilms.push(filmId);
    }
    localStorage.setItem("queued_films", queueStoragedFilms)
}

export function addFilmToWatched (filmId) {
    localStorage.setItem("watched_films", watchedStoragedFilms)

    if (localStorage.watched_films.includes(filmId)) {
        watchedStoragedFilms.splice(watchedStoragedFilms.indexOf(filmId), 1)
    } else {
        watchedStoragedFilms.push(filmId);
    }
    localStorage.setItem("watched_films", watchedStoragedFilms)
}