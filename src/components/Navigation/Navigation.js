import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ clicMenu }) => {
  let screenWidth = window.screen.width;console.log(screenWidth);
  return (
    <nav className='menu'>
      {(screenWidth < 769) && <NavLink
        exact to='/'
        onClick={clicMenu}
        activeClassName='interactiv-element menu__link_active'
        className='link menu__link'>Главная</NavLink>}
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

    </nav>
  );
}

export default Navigation;