import { useRef, useState } from 'react';
import './SearchForm.css';

function SearchForm(props) {
  const [checked, setChecked] = useState(props.checkbox=== 'true'? true :false);
  const searhRef = useRef(null);
  const checRef = useRef(null);

  const hundleCheckbox = (e) => {
    setChecked(!checked);
    props.checkboxStatus(checRef.current.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searhRef.current.validity.valid) {
      props.onPreloader();
      props.searhMovies({ keyword: searhRef.current.value, shortMovies: checRef.current.checked });
    } else { props.alertMessage('Нужно ввести ключевое слово') }
  }

  return (
    <form className='searh-form' onSubmit={handleSubmit}>
      <div className='searh-form__field'>
        <input
          type='search'
          name='search'
          id='movies-input'
          className='interactiv-element searh-form__input'
          ref={searhRef}
          defaultValue={props.keyword}
          placeholder='Фильмы'
          required />
        <button
          type='submit'
          className='interactiv-element searh-form__button'
        >Найти</button>
      </div>
      <div className='searh-form__field'>
        <label className='interactiv-element searh-form__switch'>
          <input
            className='searh-form__checkbox'
            type='checkbox'
            ref={checRef}
            checked={checked}
            onChange={hundleCheckbox} />
          <span className='searh-form__slider'></span>
        </label>
        <p className='searh-form__text'>Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;