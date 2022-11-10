import './Footer.css';

function Footer(props) {
  const year = new Date().getFullYear();
  return (
    <footer className='footer'
      style={{ display: (props.curentPage === '/sign') && 'none' }}>
      <p className='footer__text footer__text_info'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className='footer__text footer__text_year'>© {year}</p>
        <nav className='footer__link'>
          <a
            href='https://practicum.yandex.ru'
            target='_blank'
            className='interactiv-element link footer__text footer__text_indent'
            rel='noreferrer' >Яндекс.Практикум</a>
          <a
            href='https://github.com'
            className='interactiv-element link footer__text footer__text_indent'
            target='_blank'
            rel='noreferrer' >Github</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;