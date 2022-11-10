import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return(
    <section>
       <ul className='movie-scard-list'>
       {props.movies.map(item => (
          <MoviesCard
            key={item.id}
            movie={item}
             />
        ))}
       </ul>
    </section>
   );
}

export default MoviesCardList;