import { useRef } from 'react';
import './SearchForm.css';

function SearchForm(props) {

  const searhRef = useRef(null);
  const checRef = useRef(null);

  const hundleCheckbox = () => props.checkboxStatus(checRef.current.checked);

  function handleSubmit(e) {
    e.preventDefault();
    if (searhRef.current.validity.valid) {
      props.onPreloader();
      props.searhMovies({ keyword: searhRef.current.value, shortMovies: checRef.current.checked });
    } else { props.alertMessage('Нужно ввести ключевое слово') }
  }

  return (
    <form className='searh-form'>
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
          onClick={handleSubmit}
        >Найти</button>
      </div>
      <div className='searh-form__field'>
        <label className='interactiv-element searh-form__switch'>
          <input
            className='searh-form__checkbox'
            type='checkbox'
            ref={checRef}
            defaultChecked={props.checkbox}
            onClick={hundleCheckbox} />
          <span className='searh-form__slider'></span>
        </label>
        <p className='searh-form__text'>Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;