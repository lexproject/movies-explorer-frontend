import './AboutMe.css';
import aboutFoto from '../../../images/about-foto.png';
function AboutMe(props) {
  return (
    <section className='about'>
      <h2 className='main-section__title'>Студент</h2>
      <div className='about__container'>
        <div className='about__info'>
          <h3 className='about__title'>Виталий</h3>
          <p className='about__text-big'>Фронтенд-разработчик, 30 лет</p>
          <p className='about__text-medium'>Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
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