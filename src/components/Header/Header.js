import { Link, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import accaunt from '../../images/accaunt-button.svg'
import './Header.css';
import { useState } from 'react';
const Header = (props) => {
  const [isTablet, setIsTablet] = useState(false);
  const handlerMenu = () => setIsTablet(!isTablet);
  const isHome = (props.curentPage === '/')
  let screenWidth = window.screen.width;

  return (
    <header className='header'
      style={{
        display: (props.curentPage === '/sign') && 'none',
        backgroundColor: isHome && '#073042'
      }}>
      <Logo modClass={'main'} />
      <button
        className={`interactiv-element header__menu-button ${isTablet && 'header__menu-button_close'}`}
        style={{
          display: isHome && 'none',
          zIndex: !isHome && 10
        }}
        onClick={handlerMenu} />
      <div
        className={`header__menu-bar ${!isHome && (screenWidth < 769) && 'header__menu-bar_tablet'}`}
        style={{ display: isTablet && 'flex' }}>
        {(props.curentPage !== '/') &&
          <Navigation
            clicMenu={handlerMenu} />}
        <div className={`header__autorization ${!isHome && (screenWidth < 769) && 'header__autorization_tablet'}`}>
          <Link to='/profile'
            className='interactiv-element link header__text header__text_border'
            style={{ display: isHome && 'none' }}
            onClick={handlerMenu} >
            <img
              src={accaunt}
              className='header__accaunt-icon'
              alt='accaunt' />
            Аккаунт
          </Link>
          <Route exact path='/'>
            <Link
              to='/signup'
              className='interactiv-element link header__text'>Регистрация</Link>
            <Link
              to='/signin'
              className='interactiv-element link header__text header__text_link-activ'>Войти</Link>
          </Route>
        </div>
      </div>
      <div className={`popup popup_closed ${(isTablet && (screenWidth < 769)) && 'popup_opened'}`} />
    </header>
  );
}

export default Header;