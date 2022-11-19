import { memo, useCallback, useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';

const Movies = memo(({
  updateMovies,
  handleCheckboxStatus,
  alertMessage,
  chekCurrentRoute,
  searhMovies,
  moviesKeyword,
  moviesShort,
  onMovieCardClick
}) => {
  const [isLoader, setLoader] = useState(false);
  const [countMovies, setCountMovies] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [countRender, setCountRender] = useState(0);

  const onPreloader = () => { setLoader(true); }

  const setWindowDimensions = useCallback(() => {
    setScreenWidth(window.innerWidth);
    if (screenWidth < 769) { setCountMovies(countMovies => ({ ...countMovies, init: 8, add: 2 })) }
    if (screenWidth < 425) { setCountMovies(countMovies => ({ ...countMovies, init: 5, add: 1 })) }
    else if (screenWidth > 769) { setCountMovies(countMovies => ({ ...countMovies, init: 12, add: 3 })) }
  }, [screenWidth])

  useEffect(() => {
    setWindowDimensions();
    window.addEventListener('resize', setWindowDimensions);
    setCountRender(countMovies.init);
    return () => {
      window.removeEventListener('resize', setWindowDimensions);
    }
  }, [setWindowDimensions, countMovies.init]
  )

  useEffect(() => {//moviesSpred();
    (updateMovies.length !== 0) && setLoader(false);
    chekCurrentRoute('/movies');
  }, [updateMovies.length, chekCurrentRoute]);

  function hundleMoreMovies() {
    setCountRender(countRender => (countRender + countMovies.add));
  }

  return (
    <>
      <SearchForm
        searhMovies={searhMovies}
        alertMessage={alertMessage}
        onPreloader={onPreloader}
        checkboxStatus={handleCheckboxStatus}
        keyword={moviesKeyword}
        checkbox={moviesShort}
      />
      {isLoader ? <Preloader
        isMovies={(updateMovies.length === 0)} />
        : <>
          <MoviesCardList
            movies={updateMovies}
            countRender={countRender}
            onMovieCardClick={onMovieCardClick}
            isSaved={false} />
          {(updateMovies.length > countRender) && <More addMovies={hundleMoreMovies} />}
        </>}
    </>
  );
})

export default Movies;
