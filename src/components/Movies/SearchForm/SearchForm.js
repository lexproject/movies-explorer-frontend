import './SearchForm.css';

function SearchForm(props) {
  return (
    <div>
      <form className='searh-form'>
        <div className='searh-form-field'>
          <input
            type="text"
            name="search"
            id="movies-input"
            className='searh-input-movies'
            placeholder="Фильмы"
            required />
          <button type='button' className='searh-button'>Найти</button>
        </div>
        <div className='searh-form-field'>
          <label className='searh-switch'>
            <input className='searh-checkbox' type="checkbox" />
            <span className="searh-slider"></span>
          </label>
          <p className='search-filter-text'>Короткометражки</p>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;