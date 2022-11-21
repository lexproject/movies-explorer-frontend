import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = memo((props) => {

  const history = useHistory();

  return (
    <div className='blank-page'>
      <h3 className='not-found__title'>404</h3>
      <p className='not-found__text'>Страница не найдена</p>
      <span className='interactiv-element not-found__link' onClick={() => history.goBack()}>Назад</span>
    </div>
  )
})

export default PageNotFound;