import './AboutMe.css';
import aboutFoto from '../../../images/about-foto.jpg';
function AboutMe(props) {
  return (
    <section className='about'>
      <h2 className='main-section__title'>Студент</h2>
      <div className='about__container'>
        <div className='about__info'>
          <h3 className='about__title'>Виктор</h3>
          <p className='about__text-big'>Фронтенд-разработчик, 44 года</p>
          <p className='about__text-medium'>Я родился и живу в Молдавии.
            У меня есть жена и двое детей.
            Я люблю слушать музыку, а ещё увлекаюсь спортом.
            Недавно начал кодить.
            После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <span className='about__text-small'>Github</span>
        </div>
        <img
          src={aboutFoto}
          className='about__foto'
          alt='Фото профиля' />
      </div>
    </section>
  );
}

export default AboutMe;