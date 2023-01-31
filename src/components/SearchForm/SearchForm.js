import { memo, useEffect, useRef, useState } from 'react';
import './SearchForm.css';

const SearchForm = memo((props) => {
  const [checked, setChecked] = useState(false);
  const [keyword, setKeyword] = useState('');
  const searhRef = useRef('');

  useEffect(() => {
    if (!props.isSaved) {
      setChecked(props.checkbox);
      setKeyword(props.keyword);
    }

  }, [])

  const hundleCheckbox = (e) => {
    if (searhRef.current.validity.valid) {
      setChecked(e.target.checked);
      props.checkboxStatus(e.target.checked);
    }
    else {
      setChecked(checked);
      props.alertMessage('Нужно ввести ключевое слово')
    }

  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searhRef.current.validity.valid) {
      props.onPreloader();
      props.searhMovies({ keyword: keyword, shortMovies: checked });
    } else { props.alertMessage('Нужно ввести ключевое слово') }
  }

  return (
    <form className='searh-form' onSubmit={handleSubmit} noValidate>
      <div className='searh-form__field'>
        <input
          type='search'
          name='search'
          id='movies-input'
          className='interactiv-element searh-form__input'
          ref={searhRef}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
            checked={checked}
            onChange={hundleCheckbox} />
          <span className='searh-form__slider'></span>
        </label>
        <p className='searh-form__text'>Короткометражки</p>
      </div>
    </form>
  );
})

export default SearchForm;