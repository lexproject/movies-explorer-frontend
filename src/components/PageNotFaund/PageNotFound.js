import { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

const PageNotFound = memo((props) => {
  useEffect(() => {
    props.chekCurrentRoute('/sign');
  }, [props]);

  return (
    <div className='blank-page'>
      <h3 className='not-found__title'>404</h3>
      <p className='not-found__text'>Страница не найдена</p>
      <Link className='interactiv-element not-found__link' to='/'>Назад</Link>
    </div>
  )
})

export default PageNotFound;