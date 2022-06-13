const axios = require('axios');

const API_KEY = '250f014fd6a936550e378176122f5d39';
const BASE_URL = "https://api.themoviedb.org/3";
let page = 1;

export async function getPopularMovies(page) {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=uk&page=${page}`;
    const response = await axios.get(url);
    return response.data;
};

export async function getMoviesById(id) {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=uk`;
    const response = await axios.get(url);
    return response;
}

export async function getMoviesByName(page,searchQuery) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=uk&include_adult=false&page=${page}`;
    const response = await axios.get(url);
    return response.data;
};

export async function getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
};