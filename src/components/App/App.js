import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFaund/PageNotFound';
import AlertMessage from '../AlertMessage/AlertMessage';

function App() {
  const [curentPage, setCurentPage] = useState('/');
  function chekCurrentRoute(url) {
    setCurentPage(url);
  }
  return (
    <>
      <Header
        curentPage={curentPage}
      />
      <Switch>
        <Route exact path="/">
          <Main
            chekCurrentRoute={chekCurrentRoute}
          />
        </Route>
        <Route path="/movies">
          <Movies
            chekCurrentRoute={chekCurrentRoute}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            chekCurrentRoute={chekCurrentRoute} />
        </Route>
        <Route path="/profile">
          <Profile
            chekCurrentRoute={chekCurrentRoute}
            name={'Виталий'}
            email={'pochta@yandex.ru'} />
        </Route>
        <Route path="/signup">
          <Register
            chekCurrentRoute={chekCurrentRoute}
          />
        </Route>
        <Route path="/signin">
          <Login
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
      message={'test'}/>
    </>
  );
}

export default App;
