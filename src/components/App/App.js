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

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMesage, setErrorMesage] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [bestFilmKeyword, setBestFilmKeyword] = useState((localStorage.getItem('bestFilmKeyword') === null) ? '' : localStorage.getItem('bestFilmKeyword'));
  const [userFilmKeyword, setUserFilmKeyword] = useState((localStorage.getItem('userFilmKeyword') === null) ? '' : localStorage.getItem('userFilmKeyword'));
  const [userCheckbox, setUserCheckbox] = useState(localStorage.userCheckbox);
  const [mainCheckbox, setMainCheckbox] = useState(localStorage.mainCheckbox);
  const [mainMovies, setMainMovies] = useState(Array.isArray(JSON.parse(localStorage.getItem("mainMovies"))) === null ? JSON.parse(localStorage.getItem("mainMovies")) : []);
  const [userSavedMovies, setUserSavedMovies] = useState(Array.isArray(JSON.parse(localStorage.getItem("userSavedMovies"))) ? JSON.parse(localStorage.getItem("userSavedMovies")) : []);
  const [showMainMovies, setShowMainMovies] = useState(Array.isArray(JSON.parse(localStorage.getItem("showMainMovies"))) ? JSON.parse(localStorage.getItem("showMainMovies")) : []);
  const [showSavedMovies, setShowSavedMovies] = useState(Array.isArray(JSON.parse(localStorage.getItem("showSavedMovies"))) ? JSON.parse(localStorage.getItem("showSavedMovies")) : []);

  useEffect(() => {
    setBestFilmKeyword(localStorage.getItem('bestFilmKeyword'));
    setUserFilmKeyword(localStorage.getItem('userFilmKeyword'));
    setUserCheckbox(localStorage.userCheckbox);
    setMainCheckbox(localStorage.mainCheckbox);
    setMainMovies(JSON.parse(localStorage.getItem("mainMovies")));
    setUserSavedMovies(JSON.parse(localStorage.getItem("userSavedMovies")));
    setShowMainMovies(JSON.parse(localStorage.getItem("showMainMovies")));
    setShowSavedMovies(JSON.parse(localStorage.getItem("showSavedMovies")));
  }, []);

  useEffect(() => {
    localStorage.setItem('bestFilmKeyword', bestFilmKeyword);
    localStorage.setItem('userFilmKeyword', userFilmKeyword);
    localStorage.userCheckbox = userCheckbox;
    localStorage.mainCheckbox = mainCheckbox;
  }, [userCheckbox, mainCheckbox, bestFilmKeyword, userFilmKeyword]);

  useEffect(() => {
    localStorage.setItem('mainMovies', JSON.stringify(mainMovies));
    localStorage.setItem('userSavedMovies', JSON.stringify(userSavedMovies));
    localStorage.setItem('showMainMovies', JSON.stringify(showMainMovies));
    localStorage.setItem('showSavedMovies', JSON.stringify(showSavedMovies));
  }, [mainMovies, userSavedMovies, showMainMovies, showSavedMovies]);

  //////////////////////////////////

  const onSignIn = useCallback(() => {
    mainApi.getUserMe()
      .then((user) => {
        if (user) {
          setLoggedIn(true);
          setCurrentUser(user.data);
          getUserMovies();
        }
      })
      .catch(err => console.log(err.message))
      .finally(() => setIsChecked(true));
  }, []);

  useEffect(() => { onSignIn() }, [onSignIn]);

  const Sync2Id = (movie) => {
    movie.movieId = movie.id;
    movie.thumbnail = 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url;
    movie.image = 'https://api.nomoreparties.co' + movie.image.url;
    delete movie.id;
    return movie;
  }

  const getUserMovies = () => {
    mainApi.getUserMovies()
      .then(movie => setUserSavedMovies(movie.data))
      .catch(err => alertErrorMesage(err.message));
  }

  function onLogin(dataInput) {
    const { password, email } = dataInput;
    if (!email || !password) { return }
    mainApi.signin(password, email)
      .then((userData) => {
        if (userData) {
          onSignIn();
          history.push('/movies');
          alertErrorMesage(userData.message);
        }
      })
      .catch(err => { alertErrorMesage(err.message) });
  }

  function onRegister(dataAuth) {
    const { password, email, name } = dataAuth;
    if (!email || !password) { return }
    mainApi.signup(password, email, name)
      .then((userData) => {
        if (userData) {
          onLogin({ email, password })
        }
      })
      .catch(err => { alertErrorMesage(err.message) });
  }

  function onSignOut() {
    mainApi.getOut()
      .then((res) => {
        setLoggedIn(false);
        localStorage.clear();
        history.push('/');
        alertErrorMesage(res.message)
      })
      .catch(err => { alertErrorMesage(err.message) });
  }

  ////FilterSearh///
  const filterMovies = (list) => {
    const listMovies = list.moviesData;
    const shortMovies = list.shortMovies;
    const keyword = list.keyword;
    let faundMovies = [];
    if (keyword.length === 0) { return [] }
    if (shortMovies) {
      faundMovies = listMovies.filter(movie =>
        (movie.duration < 41) && movie.nameRU.includes(keyword) && movie);
    }
    if (!shortMovies) {
      faundMovies = listMovies.filter(movie =>
        (movie.nameRU.toLowerCase().includes(keyword.toLowerCase())) && movie);
    }
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
        .catch(err => alertErrorMesage(err.message));
    } else {
      setMainCheckbox(shortMovies);
      setBestFilmKeyword(keyword);
      searhMoviesSubmit(searhData, mainMovies);
    }
  }

  const handleMainCheckbox = (isShort) => {
    setMainCheckbox(isShort);
    const filtredMovies = markSavedMovies(filterMovies({
      moviesData: mainMovies,
      keyword: bestFilmKeyword,
      shortMovies: isShort
    }));
    setShowMainMovies(filtredMovies);
  }

  ///SavedSearh///
  function searhUserMovies(searhUser) {
    setUserFilmKeyword(searhUser.keyword);
    setUserCheckbox(searhUser.shortMovies);
    const filtreUserdMovies = filterMovies({
      moviesData: userSavedMovies,
      keyword: searhUser.keyword,
      shortMovies: searhUser.shortMovies
    });
    setShowSavedMovies(filtreUserdMovies);
  }

  const handleUserCheckbox = (isUserShort) => {
    setUserCheckbox(isUserShort);
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
        console.log(err);
        alertErrorMesage(err.message);
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
          console.log(err);
          alertErrorMesage(err.message);
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
      .catch(err => alertErrorMesage(err.message))
  }

  return (
    <>{isChecked &&
      <CurrentUserContext.Provider value={currentUser}>
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
            moviesKeyword={bestFilmKeyword === null ? '' : bestFilmKeyword}
            moviesShort={mainCheckbox}
            onMovieCardClick={hundleMovieCardButton} />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            searhUserMovies={searhUserMovies}
            faundUserMovies={showSavedMovies === null ? [] : showSavedMovies}
            alertMessage={alertErrorMesage}
            handleCheckboxStatus={handleUserCheckbox}
            moviesKeyword={userFilmKeyword === null ? '' : userFilmKeyword}
            moviesShort={userCheckbox}
            onMovieCardClick={hundleMovieCardButton}
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
              () => loggedIn ? <Redirect to='/movies' /> : <Register onSignup={onRegister} />
            }
          </Route>
          <Route path="/signin">
            {
              () => loggedIn ? <Redirect to='/movies' /> : <Login onSignin={onLogin} />
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
      </CurrentUserContext.Provider>
    }</>
  );
}

export default App;
