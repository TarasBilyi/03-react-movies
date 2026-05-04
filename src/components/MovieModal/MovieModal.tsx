import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";
import { useEffect } from "react";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const baseImageUrl = "https://image.tmdb.org/t/p/original";

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", escape);

    return () => {
      document.removeEventListener("keydown", escape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={baseImageUrl + movie.backdrop_path}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement,
  );
}

export default MovieModal;
