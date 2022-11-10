import './Techs.css';

function Techs(props) {
  return (
    <section className='tech'>
      <h2 className='main-section__title'>Технологии</h2>
      <h3 className='tech__title'>7 технологий</h3>
      <p className='tech__text'>На курсе веб-разработки мы освоили технологии,
        которые применили в дипломном проекте.</p>
      <ul className='list tech__list'>
        <li className='tech__icon'>HTML</li>
        <li className='tech__icon'>CSS</li>
        <li className='tech__icon'>JS</li>
        <li className='tech__icon'>React</li>
        <li className='tech__icon'>Git</li>
        <li className='tech__icon'>Express.js</li>
        <li className='tech__icon'>mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;