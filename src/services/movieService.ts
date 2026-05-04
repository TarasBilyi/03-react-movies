import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  results: Movie[];
}

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const API_BASE_URL = "https://api.themoviedb.org/3";
const ENDPOINT = {
  SEARCH: "/search/movie",
};

async function fetchMovies(query: string) {
  const url = API_BASE_URL + ENDPOINT.SEARCH;

  const { data } = await axios.get<MoviesResponse>(url, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return data.results;
}

export default fetchMovies;
