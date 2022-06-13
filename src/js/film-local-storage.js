export function addFilmToQueued (filmId) {
    localStorage.setItem("queued films", filmId)
}

export function addFilmToWatched (filmId) {
    localStorage.setItem("watched films", filmId)
}