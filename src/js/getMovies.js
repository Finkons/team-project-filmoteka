const axios = require('axios');

const API_KEY = '250f014fd6a936550e378176122f5d39';
const BASE_URL = "https://api.themoviedb.org/3";
let page = 1;

export async function getPopularMovies(page) {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=uk&page=${page}`;
    const response = await axios.get(url);
    return response.data;
};