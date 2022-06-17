const axios = require('axios');

export const API_KEY = '250f014fd6a936550e378176122f5d39';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies(page, lang) {
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=${lang}&page=${page}`;
  const response = await axios.get(url);
  return response.data;
}

export async function getMoviesById(id, lang) {
  const pageLang = document.querySelector('html').getAttribute('lang');
  if (pageLang === 'ua') {
    lang = `uk`;
  } else {
    lang = `en`;
  }

  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${lang}`;
  const response = await axios.get(url);
  return response;
}

export async function getMoviesByName(page, searchQuery) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=uk&include_adult=false&page=${page}`;
  const response = await axios.get(url);
  return response.data;
}

export async function getGenres(lang) {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${lang}`;
  const response = await axios.get(url);
  return response.data;
}
