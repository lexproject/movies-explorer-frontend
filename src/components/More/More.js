import './More.css';

function More(props) {
  function hundleMoreMovies() {
    props.addMovies();
  }
    return (
        <div className='more'>
            <button type='button' className='interactiv-element more__button' onClick={hundleMoreMovies}>Ещё</button>
        </div>
    );
}

export default More;