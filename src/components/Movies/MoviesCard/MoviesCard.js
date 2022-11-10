import './MoviesCard.css';

function MoviesCard({movie}) {
  return(
    <li className='movies-card'>
      <div className='movies-card__info'>
        <h2 className='movies-card__title'>{movie.nameRU}</h2>
        <span className='movies-card__time'>{movie.duration}</span>
        </div>
      <button type='button' className='movies-card__favorites'></button>
      <img src={movie.link} className='movies-card__image' alt={movie.nameRU} />

    </li>
   );
}

export default MoviesCard;