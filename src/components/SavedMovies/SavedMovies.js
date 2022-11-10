import { memo, useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesList from '../../utils/moviesList';

const SavedMovies = memo((props) => {
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
      {isLoader ? <Preloader /> :
        <MoviesCardList
          movies={moviesList}
          isSaved={true} />
      }
    </>
  );
})

export default SavedMovies;