import { Link, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import Popup from '../Popup/Popup';
import './Header.css';
import { useState } from 'react';
const Header = (props) => {
  const [isTablet, setIsTablet] = useState(false);
  const handlerMenu = () => setIsTablet(!isTablet);
  const isHome = (props.curentPage === '/');

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
        className={`header__menu-bar`}
        style={{
          width: !isHome && '100%'
        }}>
        {(props.curentPage !== '/') ?
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
      <Popup isTablet={isTablet} />
    </header>
  );
}

export default Header;