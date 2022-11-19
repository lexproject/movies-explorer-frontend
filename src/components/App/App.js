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
  const [curentPage, setCurentPage] = useState('/');
  const [initialMovies, setInitialMovies] = useState([]);
  const [searhKeyword, setSearhKeyword] = useState('');
  const [shortMovies, setShortMovies] = useState(false);
  const [userKeyword, setUserKeyword] = useState('');
  const [userShort, setUserShort] = useState(false);
  const [errorMesage, setErrorMesage] = useState('');
  const [userMovies, setUserMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [publicMovies, setPublicMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [isChecked, setIsChecked] = useState(false);



  const onSignIn = useCallback(() => {
    mainApi.getUserMe()
      .then((user) => {
        if (user) {
          setLoggedIn(true);
          setCurrentUser(user.data)
          getUserMovies();
          getInitialMovies(); console.log('logged');
        }
      })
      .catch(err => console.log(err.message)).
      finally(() => setIsChecked(true));
  }, []);

  useEffect(() => {
    onSignIn();
  }, []);

  function chekCurrentRoute(url) {
    setCurentPage(url);
  }

  const Sync2Id = (movie) => {
    movie.movieId = movie.id;
    movie.thumbnail = 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url;
    movie.image = 'https://api.nomoreparties.co' + movie.image.url;
    delete movie.id;
    return movie;
  }

  const getUserMovies = () => {
    mainApi.getUserMovies()
      .then(movie => setSavedMovies(movie.data))
      .catch(err => alertErrorMesage(err.message));
  }

  function getInitialMovies() {
    moviesApi.getMovies()
      .then((movies) => {
        if (movies) {
          setInitialMovies(movies.map((movie) => Sync2Id(movie)));
        }
      })
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
        history.push('/');
        alertErrorMesage(res.message)
      })
      .catch(err => { alertErrorMesage(err.message) });
  }

  ////Filter///
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
      let save = savedMovies.filter((s) => s.movieId === m.movieId && s);
      if (save.length !== 0) {
        m.owner = save[0].owner;
        m._id = save[0]._id;
      }
      return m;
    });
    return moviesSpred;
  }, [savedMovies])

  function markDeletedMovies(id) {
    const moviesSpred = publicMovies.map((m) => {
      if (m._id === id) {
        delete m.owner;
        delete m._id;
      }
      return m;
    });
    return moviesSpred;
  }

  const searhMoviesSubmit = useCallback((searhData) => {

    setSearhKeyword(searhData.keyword);
    setShortMovies(searhData.shortMovies);
    setPublicMovies(markSavedMovies(filterMovies({
      moviesData: initialMovies,
      keyword: searhData.keyword,
      shortMovies: searhData.shortMovies
    })))
  }, [initialMovies, markSavedMovies])

  ///MainSearh////
  function searhMainMovies(searhData) {
    if (initialMovies.length === 0) {
      getInitialMovies();
    }
    if (initialMovies.length !== 0) {
      searhMoviesSubmit(searhData);
    }
  }

  const handleMainCheckbox = (isShort) => {
    setShortMovies(isShort);
    setPublicMovies(markSavedMovies(filterMovies({
      moviesData: initialMovies,
      keyword: searhKeyword,
      shortMovies: isShort
    })));
  }
  ///SavedPageSearh///
  const searhUserMovies = (searhArg) => {
    setUserKeyword(searhArg.keyword);
    setUserShort(searhArg.shortMovies);
    setUserMovies(filterMovies({
      moviesData: savedMovies,
      keyword: searhArg.keyword,
      shortMovies: searhArg.shortMovies
    }));
  }

  const handleUserCheckbox = (isShort) => {
    setUserShort(isShort);
    setUserMovies(filterMovies({
      moviesData: savedMovies,
      keyword: userKeyword,
      shortMovies: isShort
    }));
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
        setSavedMovies(savedMovies => savedMovies.filter(m => m._id !== moviedata));
        setUserMovies(userMovies => userMovies.filter(m => m._id !== moviedata));
        setPublicMovies(markDeletedMovies(moviedata));
        alertErrorMesage(movieDelete.message);
      })
      .catch(err => {
        console.log(err);
        alertErrorMesage(err.message);
      })
  }
  ///Save Movies///
  function addMovie(moviedata) {
    (savedMovies.some(m => m.movieId === moviedata.movieId)) ?
      alertErrorMesage('Фильм ' + moviedata.nameRU + ' уже добавлен в избранные.') :
      mainApi.setNewMovie(moviedata)
        .then((movieSaved) => {
          const newMovie = movieSaved.data;
          setSavedMovies([newMovie, ...savedMovies]);
          setPublicMovies(publicMovies => publicMovies.map(m => { if (newMovie.movieId === m.movieId) { m._id = newMovie._id; } return m }));
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
        <Header
          curentPage={curentPage}
          isAutorizated={loggedIn}
        />
        <Switch>
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            chekCurrentRoute={chekCurrentRoute}
            searhMovies={searhMainMovies}
            updateMovies={publicMovies}
            alertMessage={alertErrorMesage}
            handleCheckboxStatus={handleMainCheckbox}
            moviesKeyword={searhKeyword}
            moviesShort={shortMovies}
            onMovieCardClick={hundleMovieCardButton} />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            chekCurrentRoute={chekCurrentRoute}
            searhUserMovies={searhUserMovies}
            faundUserMovies={userMovies}
            alertMessage={alertErrorMesage}
            handleCheckboxStatus={handleUserCheckbox}
            moviesKeyword={userKeyword}
            moviesShort={userShort}
            onMovieCardClick={hundleMovieCardButton}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            chekCurrentRoute={chekCurrentRoute}
            onUpdateUser={onUpdateUser}
            onSignOut={onSignOut}
            name={currentUser.name}
            email={currentUser.email}
          />
          <Route path="/signup">
            {
              () => loggedIn ? <Redirect to='/movies' /> : <Register chekCurrentRoute={chekCurrentRoute} onSignup={onRegister} />
            }
          </Route>
          <Route path="/signin">
            {
              () => loggedIn ? <Redirect to='/movies' /> : <Login chekCurrentRoute={chekCurrentRoute} onSignin={onLogin} />
            }
          </Route>
          <Route exact path="/">
            <Main
              chekCurrentRoute={chekCurrentRoute}
            />
          </Route>
          <Route path="*">
            <PageNotFound
              chekCurrentRoute={chekCurrentRoute} />
          </Route>
        </Switch>
        <Footer
          curentPage={curentPage} />
        <AlertMessage
          message={errorMesage} />
      </CurrentUserContext.Provider>
    }</>
  );
}

export default App;
