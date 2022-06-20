const axios = require('axios');

export const API_KEY = '250f014fd6a936550e378176122f5d39';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies(page, lang) {
  try {
    let pageLang = localStorage.getItem('lang');
    if (pageLang === 'ua') {
      lang = `uk`;
    } else {
      lang = `en`;
    }
    
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=${lang}&page=${page}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMoviesById(id, lang) {
  try {
    let pageLang = document.querySelector('html').getAttribute('lang');
    if (pageLang === 'ua') {
      lang = `uk`;
    } else {
      lang = `en`;
    }

    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${lang}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getMoviesByName(page, searchQuery) {
  try {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=uk&include_adult=false&page=${page}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getGenres(lang) {
  try {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${lang}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTotalPages(page) {
  try {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en&page=${page}`;
    const response = await axios.get(url);
    const totalPages = response.data.total_pages;
    // console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
}
