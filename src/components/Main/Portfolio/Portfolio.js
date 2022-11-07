import './Portfolio.css';
import link from '../../../images/link.svg'

function Portfolio(props) {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='list portfolio__list'>
        <li className='portfolio__content'>
          <p className='portfolio__text'>Статичный сайт</p>
          <a
            href='https://github.com/lexproject/how-to-learn'
            className='interactiv-element portfolio__link'
            target='_blank'
            rel='noreferrer'><img src={link} alt='Ссылка' className='portfolio__image-link' /></a>
        </li>
        <li className='portfolio__content'>
          <p className='portfolio__text'>Адаптивный сайт</p>
          <a
            href='https://github.com/lexproject/russian-travel'
            className='interactiv-element portfolio__link'
            target='_blank'
            rel='noreferrer'><img src={link} alt='Ссылка' className='portfolio__image-link' /></a>
        </li>
        <li className='portfolio__content'>
          <p className='portfolio__text'>Одностраничное приложение</p>
          <a
            href='https://lexproject.github.io/mesto/'
            className='interactiv-element portfolio__link'
            target='_blank'
            rel='noreferrer'><img src={link} alt='Ссылка' className='portfolio__image-link' /></a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;