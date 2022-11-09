import './Portfolio.css';
import link from '../../../images/link.svg'

function Portfolio(props) {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='list portfolio__list'>
        <li className='portfolio__content'>
          <a
            href='https://github.com/lexproject/how-to-learn'
            className='link interactiv-element portfolio__link'
            target='_blank'
            rel='noreferrer'>
            <p className='portfolio__text'>Статичный сайт</p>
            <img src={link} alt='Ссылка' className='portfolio__image-link' /></a>
        </li>
        <li className='portfolio__content'>
          <a
            href='https://github.com/lexproject/russian-travel'
            className='link interactiv-element portfolio__link'
            target='_blank'
            rel='noreferrer'>
            <p className='portfolio__text'>Адаптивный сайт</p>
            <img src={link} alt='Ссылка' className='portfolio__image-link' /></a>
        </li>
        <li className='portfolio__content'>
          <a
            href='https://lexproject.github.io/mesto/'
            className='link interactiv-element portfolio__link'
            target='_blank'
            rel='noreferrer'>
            <p className='portfolio__text'>Одностраничное приложение</p>
            <img src={link} alt='Ссылка' className='portfolio__image-link' />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;