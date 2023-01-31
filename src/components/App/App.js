import { useState, useCallback, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFaund/PageNotFound';
import AlertMessage from '../AlertMessage/AlertMessage';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { InfoMessageContext } from '../../contexts/InfoMessageContext';
import { useValidation } from '../../utils/Validation';
import { apiBestFilms, shortMoviesTime } from '../../utils/constants';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMesage, setErrorMesage] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [bestFilmKeyword, setBestFilmKeyword] = useState(localStorage.bestFilmKeyword);
  const [userFilmKeyword, setUserFilmKeyword] = useState('');
  const [mainCheckbox, setMainCheckbox] = useState(localStorage.mainCheckbox === null ? false : localStorage.mainCheckbox === 'false' ? false : true);
  const [mainMovies, setMainMovies] = useState(JSON.parse(localStorage.getItem("mainMovies")));
  const [userSavedMovies, setUserSavedMovies] = useState(JSON.parse(localStorage.getItem("userSavedMovies")));
  const [showMainMovies, setShowMainMovies] = useState(JSON.parse(localStorage.getItem("showMainMovies")));
  const [showSavedMovies, setShowSavedMovies] = useState(JSON.parse(localStorage.getItem("userSavedMovies")));
  const [isLoader, setLoader] = useState(false);
  const [isSavedLoader, setSavedLoader] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [isSend, setIsSend] = useState(false);
  const { resetForm } = useValidation();


  useEffect(() => {
    setBestFilmKeyword(localStorage.bestFilmKeyword);
    setMainCheckbox(localStorage.mainCheckbox === null ? false : localStorage.mainCheckbox === 'false' ? false : true);
    setMainMovies(JSON.parse(localStorage.getItem("mainMovies")));
    setUserSavedMovies(JSON.parse(localStorage.getItem("userSavedMovies")));
    setShowMainMovies(JSON.parse(localStorage.getItem("showMainMovies")));
    setShowSavedMovies(JSON.parse(localStorage.getItem("userSavedMovies")));
  }, []);

  useEffect(() => {
    localStorage.bestFilmKeyword = bestFilmKeyword;
    localStorage.mainCheckbox = mainCheckbox;
  }, [mainCheckbox, bestFilmKeyword]);

  useEffect(() => {
    localStorage.setItem('mainMovies', JSON.stringify(mainMovies));
    localStorage.setItem('userSavedMovies', JSON.stringify(userSavedMovies));
    localStorage.setItem('showMainMovies', JSON.stringify(showMainMovies));
  }, [mainMovies, userSavedMovies, showMainMovies, showSavedMovies]);

  //////////////////////////////////
  const allOut = () => {
    setLoggedIn(false);
    localStorage.clear();
    setBestFilmKeyword('');
    setUserFilmKeyword('');
    setMainCheckbox(null);
    setMainMovies(null);
    setUserSavedMovies(null);
    setShowMainMovies(null);
    setShowSavedMovies(null);
    history.push('/');
  }

  const onSignIn = useCallback(() => {
    mainApi.getUserMe()
      .then((user) => {
        if (user) {
          setLoggedIn(true);
          setCurrentUser(user.data);
          getUserMovies();
        }
      })
      .catch(err => {
        err.message.includes('Ошибка 401') && allOut();
        console.log(err.message);
        alertErrorMesage('Для полного доступа необходима авторизация.')
      })
      .finally(() => setIsChecked(true));
  }, []);

  useEffect(() => { onSignIn(); setInfoMessage(''); }, [onSignIn]);

  const Sync2Id = (movie) => {
    movie.movieId = movie.id;
    movie.thumbnail = apiBestFilms + movie.image.formats.thumbnail.url;
    movie.image = apiBestFilms + movie.image.url;
    delete movie.id;
    return movie;
  }

  const getUserMovies = () => {
    mainApi.getUserMovies()
      .then(movie => setUserSavedMovies(movie.data))
      .catch(err => {
        err.message.includes('Ошибка 401') && allOut();
        alertErrorMesage(err.message.slice(12, -2));
      });
  }

  function loadSavedMovies() { searhUserMovies(null) }

  const sendRequest = () => setIsSend(true);

  function onLogin(dataInput) {
    const { password, email } = dataInput;
    if (!email || !password) { return }
    mainApi.signin(password, email)
      .then((userData) => {
        if (userData) {
          setIsSend(false);
          resetForm();
          setLoggedIn(true);
          onSignIn();
          history.push('/movies');
          alertErrorMesage(userData.message);
        }
      })
      .catch(err => {
        setInfoMessage(err.message.slice(12, -2));
        setIsSend(false);
      });
  }

  function onRegister(dataAuth) {
    const { password, email, name } = dataAuth;
    if (!email || !password) { return }
    mainApi.signup(password, email, name)
      .then((userData) => {
        if (userData) {
          resetForm();
          setIsSend(false);
          onLogin({ email, password })
        }
      })
      .catch(err => {
        setInfoMessage(err.message.slice(12, -2));
        setIsSend(false);
      });
  }

  function onSignOut() {
    mainApi.getOut()
      .then((res) => {
        allOut();
        alertErrorMesage(res.message)
      })
      .catch(err => { alertErrorMesage(err.message.slice(12, -2)) });
  }

  const onPreloader = () => { setInfoMessage(''); setLoader(true); }
  const closePreloader = () => {
    setLoader(false);
    setSavedLoader(false)
  };
  const onSavedPreloader = () => { setInfoMessage(''); setSavedLoader(true); }


  ////FilterSearh///
  const filterMovies = (list) => {
    setInfoMessage('');
    const listMovies = list.moviesData;
    const shortMovies = list.shortMovies;
    const keyword = list.keyword;
    let faundMovies = [];
    if (keyword === '') { return [] }
    if (shortMovies) {
      faundMovies = listMovies.filter(movie =>
        (movie.duration < shortMoviesTime) && movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) && movie);
    }
    if (!shortMovies) {
      faundMovies = listMovies.filter(movie =>
        (movie.nameRU.toLowerCase().includes(keyword.toLowerCase())) && movie);
    }
    faundMovies.length === 0 ? setInfoMessage('Ничего не найдено') : closePreloader();
    return faundMovies;
  }

  const markSavedMovies = useCallback((arr) => {
    const moviesSpred = arr.map((m) => {
      let save = userSavedMovies.filter((s) => s.movieId === m.movieId && s);
      if (save.length !== 0) {
        m.owner = save[0].owner;
        m._id = save[0]._id;
      }
      return m;
    });
    return moviesSpred;
  }, [userSavedMovies])

  function markDeletedMovies(id) {
    const moviesSpred = showMainMovies.map((m) => {
      if (m._id === id) {
        delete m.owner;
        delete m._id;
      }
      return m;
    });
    return moviesSpred;
  }

  ///MainSearh////
  const searhMoviesSubmit = (searhData, movies) => {
    const filtredMovies = markSavedMovies(filterMovies({
      moviesData: movies,
      keyword: searhData.keyword,
      shortMovies: searhData.shortMovies
    }));

    setShowMainMovies(filtredMovies);
  }

  function searhMainMovies(searhData) {
    setInfoMessage('');
    const { keyword, shortMovies } = searhData;
    if (mainMovies === null) {
      moviesApi.getMovies()
        .then((movies) => {
          if (movies) {
            setMainCheckbox(shortMovies);
            setBestFilmKeyword(keyword);
            const bestMovies = movies.map((movie) => Sync2Id(movie));
            setMainMovies(bestMovies);
            searhMoviesSubmit(searhData, bestMovies);
          }
        })
        .catch(err => {
          alertErrorMesage(err.message.slice(12, -2));
          setInfoMessage('«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз».');
        });
    } else {
      setMainCheckbox(shortMovies);
      setBestFilmKeyword(keyword);
      searhMoviesSubmit(searhData, mainMovies);
    }
  }

  const handleMainCheckbox = (isShort) => {
    setMainCheckbox(isShort);
    searhMoviesSubmit({ keyword: bestFilmKeyword, shortMovies: isShort }, mainMovies);
  }

  ///SavedSearh///
  function searhUserMovies(searhUser) {
    if (searhUser === null) { setShowSavedMovies(userSavedMovies) }
    else {
      setUserFilmKeyword(searhUser.keyword);
      const filtreUserdMovies = filterMovies({
        moviesData: userSavedMovies,
        keyword: searhUser.keyword,
        shortMovies: searhUser.shortMovies
      });
      setShowSavedMovies(filtreUserdMovies);
    }
  }

  const handleUserCheckbox = (isUserShort) => {
    const filtreUserdMovies = filterMovies({
      moviesData: userSavedMovies,
      keyword: userFilmKeyword,
      shortMovies: isUserShort
    });
    setShowSavedMovies(filtreUserdMovies);
  }

  ///AlertMessage////
  function alertErrorMesage(message) {
    setErrorMesage(message);
    setTimeout(() => {
      setErrorMesage('');
    }, 7000);
  }
  ///Delete Movies///
  function deleteMovie(moviedata) {
    mainApi.deleteMovie(moviedata)
      .then((movieDelete) => {
        setUserSavedMovies(userSavedMovies => userSavedMovies.filter(m => m._id !== moviedata));
        setShowSavedMovies(showSavedMovies => showSavedMovies.filter(m => m._id !== moviedata));
        setShowMainMovies(markDeletedMovies(moviedata));
        alertErrorMesage(movieDelete.message);
      })
      .catch(err => {
        err.message.includes('Ошибка 401') && allOut();
        console.log(err);
        alertErrorMesage(err.message.slice(12, -2));
      })
  }
  ///Save Movies///
  function addMovie(moviedata) {
    (userSavedMovies.some(m => m.movieId === moviedata.movieId)) ?
      alertErrorMesage('Фильм ' + moviedata.nameRU + ' уже добавлен в избранные.') :
      mainApi.setNewMovie(moviedata)
        .then((movieSaved) => {
          const newMovie = movieSaved.data;
          setUserSavedMovies([newMovie, ...userSavedMovies]);
          setShowMainMovies(showMainMovies => showMainMovies.map(m => { if (newMovie.movieId === m.movieId) { m._id = newMovie._id; } return m }))
          alertErrorMesage('Фильм ' + movieSaved.data.nameRU + ' помещён в избранное.');
        })
        .catch(err => {
          err.message.includes('Ошибка 401') && allOut();
          console.log(err);
          alertErrorMesage(err.message.slice(12, -2));
        })
  }
  ///Like & Dislike///
  const hundleMovieCardButton = (moviedata, isLike) => {
    isLike ? deleteMovie(moviedata) : addMovie(moviedata)
  }
  ///Update User///
  function onUpdateUser(updateData) {
    mainApi.updateUserMe(updateData)
      .then((user) => {
        setCurrentUser(user.data);
        alertErrorMesage('Данные были успешно редактированы.');
      })
      .catch(err => {
        alertErrorMesage(err.message.slice(12, -2));
        err.message.includes('Ошибка 401') && allOut();
      })
  }

  return (
    <>{isChecked &&
      <CurrentUserContext.Provider value={currentUser}>
        <InfoMessageContext.Provider value={infoMessage}>
          <Header isAutorizated={loggedIn} />
          <Switch>
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
              searhMovies={searhMainMovies}
              updateMovies={showMainMovies === null ? [] : showMainMovies}
              alertMessage={alertErrorMesage}
              handleCheckboxStatus={handleMainCheckbox}
              moviesKeyword={typeof bestFilmKeyword !== 'string' ? '' : bestFilmKeyword}
              moviesShort={typeof mainCheckbox !== 'boolean' ? false : mainCheckbox}
              onMovieCardClick={hundleMovieCardButton}
              onPreloader={onPreloader}
              isPreloader={isLoader}

            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              searhUserMovies={searhUserMovies}
              faundUserMovies={showSavedMovies === null ? [] : showSavedMovies}
              alertMessage={alertErrorMesage}
              handleCheckboxStatus={handleUserCheckbox}
              moviesKeyword={''}
              moviesShort={false}
              onMovieCardClick={hundleMovieCardButton}
              loadSavedMovies={loadSavedMovies}
              onPreloader={onSavedPreloader}
              isPreloader={isSavedLoader}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onUpdateUser={onUpdateUser}
              onSignOut={onSignOut}
              name={currentUser.name}
              email={currentUser.email}
            />
            <Route path="/signup">
              {
                () => loggedIn ? <Redirect to='/movies' /> : <Register
                  onSignup={onRegister}
                  isDisabled={sendRequest}
                  elementDisabledStatus={isSend}
                />
              }
            </Route>
            <Route path="/signin">
              {
                () => loggedIn ? <Redirect to='/movies' /> : <Login
                  onSignin={onLogin}
                  isDisabled={sendRequest}
                  elementDisabledStatus={isSend}
                />
              }
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
          <AlertMessage message={errorMesage} />
        </InfoMessageContext.Provider>
      </CurrentUserContext.Provider>
    }</>
  );
}

export default App;
