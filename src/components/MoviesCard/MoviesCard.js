import { useEffect, useState } from 'react';
import './MoviesCard.css';

function MoviesCard({ movie, isSaved, onMovieCardClick }) {
  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    movie._id && setIsLike(true);
  }, [])

  function handleSaveMovie() {
    const saveMovie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
    onMovieCardClick(saveMovie,false);
    setIsLike(true);
  }

  function handleDeleteMovie() {
    onMovieCardClick(movie._id, true);
    !isSaved && setIsLike(false);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'h ' + minutes + 'm';
  };
  const cardButton = `movies-card__button ${isSaved ? 'movies-card__button_delite' : isLike && 'movies-card__button_active'}`;

  return (
    <li className='movies-card'>
      <div className='movies-card__info'>
        <h2 className='movies-card__title text-over'>{movie.nameRU}</h2>
        <span className='movies-card__time'>{getTimeFromMins(movie.duration)}</span>
      </div>
      <button
        type='button'
        className={cardButton}
        onClick={isSaved ? handleDeleteMovie : isLike ? handleDeleteMovie : handleSaveMovie}></button>
      <a className='interactiv-element' href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img src={movie.image} className='movies-card__image' alt={movie.nameRU} />
      </a>
    </li>
  );
}

export default MoviesCard;