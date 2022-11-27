import { memo, useCallback, useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import { variablesOnRenderMovies } from '../../utils/constants';

const Movies = memo(({
  updateMovies,
  handleCheckboxStatus,
  alertMessage,
  searhMovies,
  moviesKeyword,
  moviesShort,
  onMovieCardClick,
  onPreloader,
  isPreloader
}) => {
  const [countMovies, setCountMovies] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [countRender, setCountRender] = useState(0);
  const {
    initialCardOnDesctop,
    initialCardOnTablet,
    initialCardOnMobile,
    cardAddOnDesctop,
    cardAddOnTablet,
    cardAddOnMobile
  } = variablesOnRenderMovies;

  const setWindowDimensions = useCallback(() => {
    setScreenWidth(window.innerWidth);
    if (screenWidth < 769) { setCountMovies(countMovies => ({ ...countMovies, init: initialCardOnTablet, add: cardAddOnTablet })) }
    if (screenWidth < 425) { setCountMovies(countMovies => ({ ...countMovies, init: initialCardOnMobile, add: cardAddOnMobile })) }
    else if (screenWidth > 769) { setCountMovies(countMovies => ({ ...countMovies, init: initialCardOnDesctop, add: cardAddOnDesctop })) }
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

      {isPreloader ? <Preloader />
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
