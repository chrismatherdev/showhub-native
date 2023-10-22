import axios from 'axios';

export type ShowAPIResponseType = {
  data: {
    results: ShowResultType;
  };
  status: number;
  statusText: string;
  headers: object;
  config: object;
  id: number;
};

export type ShowResultType = {
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_name?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}[];

const BASE_URL = 'https://api.themoviedb.org/3/';
export const image185 = (posterPath: string) =>
  posterPath ? 'https://image.tmdb.org/t/p/w185' + posterPath : null;

export const image342 = (posterPath: string) =>
  posterPath ? 'https://image.tmdb.org/t/p/w342' + posterPath : null;
const searchMoviesEndpoint = `${BASE_URL}/search/movie?api_key=${process.env.API_KEY}`;

export const HOMEPAGE_ROUTES = [
  `${BASE_URL}discover/movie?api_key=${process.env.API_KEY}`,
  `${BASE_URL}discover/tv?api_key=${process.env.API_KEY}`,
  `${BASE_URL}movie/top_rated?api_key=${process.env.API_KEY}`,
  `${BASE_URL}tv/top_rated?api_key=${process.env.API_KEY}`,
];

export const MOVIE_ROUTES = [
  `${BASE_URL}discover/movie?api_key=${process.env.API_KEY}`,
  `${BASE_URL}discover/movie?api_key=${process.env.API_KEY}&page=2`,
  `${BASE_URL}discover/movie?api_key=${process.env.API_KEY}&page=3`,
  `${BASE_URL}discover/movie?api_key=${process.env.API_KEY}&page=4`,
];

export const TV_ROUTES = [
  `${BASE_URL}discover/tv?api_key=${process.env.API_KEY}`,
  `${BASE_URL}discover/tv?api_key=${process.env.API_KEY}&page=2`,
  `${BASE_URL}discover/tv?api_key=${process.env.API_KEY}&page=3`,
  `${BASE_URL}discover/tv?api_key=${process.env.API_KEY}&page=4`,
];

const generateEndpoint = (contentType: string, contentId: string, subContent?: string) => {
  const baseEndpoint = `${BASE_URL}${contentType}/${contentId}`;

  const endpointWithKey = `${baseEndpoint}?api_key=${process.env.API_KEY}`;
  const endpointWithSubContent = `${baseEndpoint}/${subContent}?api_key=${process.env.API_KEY}`;

  return subContent ? endpointWithSubContent : endpointWithKey;
};

const apiCall = async (endpoint: string, params?: any) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return {};
  }
};

export const fetchMovieDetails = (id: string) => {
  return apiCall(generateEndpoint('movie', id));
};

export const fetchMovieCredits = (movieId: string) => {
  return apiCall(generateEndpoint('movie', movieId, 'credits'));
};

export const fetchSimilarMovies = (movieId: string) => {
  return apiCall(generateEndpoint('movie', movieId, 'similar'));
};

export const fetchTvDetails = (id: string) => {
  return apiCall(generateEndpoint('tv', id));
};

export const fetchTvCredits = (id: string) => {
  return apiCall(generateEndpoint('tv', id, 'credits'));
};

export const fetchSimilarTv = (id: string) => {
  return apiCall(generateEndpoint('tv', id, 'similar'));
};

export const fetchPersonDetails = (personId: string) => {
  return apiCall(generateEndpoint('person', personId));
};

export const fetchPersonMovies = (personId) => {
  return apiCall(generateEndpoint('person', personId, 'movie_credits'));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
