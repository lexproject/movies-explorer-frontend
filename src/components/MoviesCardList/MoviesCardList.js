import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
      <ul className='movies-card-list'>
        {props.movies.map(item => (
          <MoviesCard
            key={item.id}
            movie={item}
            isSaved={props.isSaved}
          />
        ))}
      </ul>
  );
}

export default MoviesCardList;