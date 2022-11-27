import { memo, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = memo((props) => {

  useEffect(() => {
    props.loadSavedMovies();
  }, []);

  return (
    <>
      <SearchForm
        searhMovies={props.searhUserMovies}
        alertMessage={props.alertMessage}
        onPreloader={props.onPreloader}
        checkboxStatus={props.handleCheckboxStatus}
        keyword={props.moviesKeyword}
        checkbox={props.moviesShort}
      />

      {props.isPreloader ? <Preloader /> :
        <MoviesCardList
          movies={props.faundUserMovies}
          isSaved={true}
          countRender={props.faundUserMovies.length}
          onMovieCardClick={props.onMovieCardClick} />
      }
    </>
  );
})

export default SavedMovies;