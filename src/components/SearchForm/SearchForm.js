import './SearchForm.css';

function SearchForm(props) {
  return (
    <form className='searh-form'>
      <div className='searh-form__field'>
        <input
          type='search'
          name='search'
          id='movies-input'
          className='interactiv-element searh-form__input'
          placeholder='Фильмы'
          required />
        <button type='button' className='interactiv-element searh-form__button'>Найти</button>
      </div>
      <div className='searh-form__field'>
        <label className='interactiv-element searh-form__switch'>
          <input className='searh-form__checkbox' type='checkbox' />
          <span className='searh-form__slider'></span>
        </label>
        <p className='searh-form__text'>Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;