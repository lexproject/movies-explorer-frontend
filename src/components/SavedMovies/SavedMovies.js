import { memo, useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = memo((props) => {
  const [isLoader, setLoader] = useState(false);

  const onPreloader = () => setLoader(true);

  useEffect(() => {
    (props.faundUserMovies.length !== 0) && setLoader(false);
  }, [props]);

  return (
    <>
      <SearchForm
        searhMovies={props.searhUserMovies}
        alertMessage={props.alertMessage}
        onPreloader={onPreloader}
        checkboxStatus={props.handleCheckboxStatus}
        keyword={props.moviesKeyword}
        checkbox={props.moviesShort}
      />

      {isLoader ? <Preloader
        isMovies={(props.faundUserMovies.length === 0)} /> :
        <MoviesCardList
          movies={props.faundUserMovies}
          isSaved={true}
          countRender={props.faundUserMovies.length}
          onMovieCardClick={props.onMovieCardClick}/>
      }
    </>
  );
})

export default SavedMovies;