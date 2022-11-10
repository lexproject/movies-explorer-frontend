import { NavLink } from 'react-router-dom';
import './Navigation.css';
import accaunt from '../../images/accaunt-button.svg'

const Navigation = ({ clicMenu, togleMenu }) => {
  return (
    <nav className='menu'
      style={{ display: togleMenu && 'flex' }}>
      <NavLink
        exact to='/'
        onClick={clicMenu}
        activeClassName='interactiv-element menu__link_active'
        className='link menu__link menu__link_inactive'>Главная</NavLink>
      <NavLink
        to='/movies'
        onClick={clicMenu}
        activeClassName='interactiv-element menu__link_active'
        className='link menu__link'>Фильмы</NavLink>
      <NavLink
        to='/saved-movies'
        onClick={clicMenu}
        activeClassName='menu__link_active'
        className='interactiv-element link menu__link'>Сохранённые фильмы</NavLink>
      <NavLink to='/profile'
        className='interactiv-element link menu__icon'
        onClick={clicMenu} >
        <img
          src={accaunt}
          className='menu__image-icon'
          alt='accaunt' />
        Аккаунт
      </NavLink>

    </nav>
  );
}

export default Navigation;