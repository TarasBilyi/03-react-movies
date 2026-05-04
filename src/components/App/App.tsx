import { useState } from "react";
import type { Movie } from "../../types/movie";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsError(false);
    setIsLoading(true);

    try {
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid onSelect={setSelectedMovie} movies={movies} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
