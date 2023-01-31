import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { memo } from 'react';

const MoviesCardList = memo((props) => {

  return (
    <ul className='movies-card-list'>
      {props.movies.map((item, index) => {
        return (index < props.countRender) &&
          <MoviesCard
            key={item.movieId}
            movie={item}
            isSaved={props.isSaved}
            onMovieCardClick={props.onMovieCardClick}
          />
      }
      )}
    </ul>
  );
})

export default MoviesCardList;