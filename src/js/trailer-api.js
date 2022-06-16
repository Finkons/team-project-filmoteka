const axios = require('axios');

export const API_KEY = 'AIzaSyCVJtDEpn2VDC8Gaxpc6gAfbCDhDbwjKfA';
const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

export async function getMoviesTrailer(movieTitle) {
    const url = `${BASE_URL}/search?part=snippet&maxResults=1&q=${movieTitle}&key=${API_KEY}&type=video`;
    const response = await axios.get(url);
    return response.data;
};