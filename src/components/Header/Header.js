import { Link, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import Popup from '../Popup/Popup';
import './Header.css';
import { useState } from 'react';
const Header = (props) => {

  const location = useLocation();
  const [isTablet, setIsTablet] = useState(false);
  const handlerMenu = () => setIsTablet(!isTablet);
  const isHome = (location.pathname === '/');

  return (
    <header className='header'
      style={{
        display: (location.pathname === '/signin' || location.pathname === '/signup') && 'none',
        backgroundColor: isHome && '#073042'
      }}>
      <Logo modClass={'main'} />
      <button
        className={`interactiv-element header__menu-button ${isTablet && 'header__menu-button_close'}`}
        style={{
          display: !props.isAutorizated && 'none'
        }}
        onClick={handlerMenu} />
      <div
        className={`header__menu-bar`}
        style={{
          width: !isHome && '100%'
        }}>
        {(props.isAutorizated) ?
          <Navigation
            clicMenu={handlerMenu}
            togleMenu={isTablet} /> :
          <div className={`header__autorization`}>
            <Route exact path='/'>
              <Link
                to='/signup'
                className='interactiv-element link header__text'>Регистрация</Link>
              <Link
                to='/signin'
                className='interactiv-element link header__text header__text_link-activ'>Войти</Link>
            </Route>
          </div>}
      </div>
      {!props.isAutorizated && <Popup isTablet={isTablet} />}
    </header>
  );
}

export default Header;