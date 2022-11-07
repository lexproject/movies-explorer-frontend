import './AboutProject.css';

function AboutProject(props) {
  return (

    <section className='project'>
      <h2 className='main-section__title'>О проекте</h2>
      <div className='project__list'>
        <div className='project__table project__table_left'>
          <p className='project__table-title'>Дипломный проект включал 5 этапов</p>
          <p className='project__table-text'>Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.</p></div>
        <div className='project__table'>
          <p className='project__table-title'>На выполнение диплома ушло 5 недель</p>
          <p className='project__table-text'>У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.</p></div>
      </div>
      <div className='project__etaps'>
        <p className='project__etap project__etap-text project__etap_backend'>
          <span className='project__etap-padding project__etap_small'>1 неделя</span>
          <span className='project__etap-padding'>Back-end</span>
        </p>
        <p className='project__etap project__etap-text'>
          <span className='project__etap-padding project__etap_big'>4 недели</span>
          <span className='project__etap-padding'>Front-end</span>
        </p>
      </div>
    </section>

  );
}
export default AboutProject;