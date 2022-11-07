import './Portfolio.css';

function Portfolio(props) {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='list portfolio__list'>
        <li className='portfolio__link'>
          <h3 className='portfolio__text'>Статичный сайт</h3>
          <a
          href='https://github.com/lexproject/how-to-learn'
          className='link interactiv-element portfolio__text'
          target='_blank'
          rel='noreferrer'>🡥</a>
        </li>
        <li className='portfolio__link'>
          <h3 className='portfolio__text'>Адаптивный сайт</h3>
          <a
          href='https://github.com/lexproject/russian-travel'
          className='link interactiv-element portfolio__text'
          target='_blank'
          rel='noreferrer'>🡥</a>
        </li>
        <li className='portfolio__link'>
          <h3 className='portfolio__text'>Одностраничное приложение</h3>
          <a
          href='https://lexproject.github.io/mesto/'
          className='link interactiv-element portfolio__text'
          target='_blank'
          rel='noreferrer'>🡥</a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;