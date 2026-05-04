import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const baseImageUrl = "https://image.tmdb.org/t/p/w500";

function MovieGrid({ onSelect, movies }: MovieGridProps) {
  const handleSelect = (movie: Movie) => {
    onSelect(movie);
  };
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => handleSelect(movie)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={baseImageUrl + movie.poster_path}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
