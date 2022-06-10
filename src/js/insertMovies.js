const refs = {
    galleryContainer: document.querySelector (".card-collection"),
}


function renderMoviesList(movies) {
    const markup = movies.map(movie => {
        return `<div class="movie-card">
  <img src="https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}" alt="poster" loading="lazy" height = "200 px" />
  <div class="info">
    <p class="info-item">
      <b>Title</b> ${movie.title}
    </p>
    <p class="info-item">
      <b>Average</b> ${movie.vote_average}
    </p>

    <p class="info-item">
      <b>Id</b> ${movie.id}
    </p>
  </div>
</div>`
    }).join("");
    refs.galleryContainer.insertAdjacentHTML("beforeend", markup);
};

function insertPopularMovies() {
    getPopularMovies(page).then(data => {
        console.log(data.results);
        renderMoviesList(data.results);
    })
}

insertPopularMovies();