import { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesList from '../../utils/moviesList';
import More from '../More/More';
function Movies(props) {
  const [isLoader, setLoader] = useState(true);
  useEffect(() => {
    props.chekCurrentRoute('/movies');
    const timer = setTimeout(() => {
      setLoader(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [props, isLoader]);
  return (
    <>
      <SearchForm />
      {isLoader ? <Preloader />
        : <>
          <MoviesCardList
            movies={moviesList} />
          <More />
        </>}
    </>
  );
}

export default Movies;
