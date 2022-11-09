import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Autorization.css'

const Autorization = (props) => {
  return (
    <div className='blank-page autorization'>
      <Logo modClass={'sign'}/>
      <h2 className='autorization__title'>{props.titleText}</h2>
      <form
        className='autorization__form'>
        {props.children}
      </form>
      <button
        type='submit'
        form='sign-form'
        className='interactiv-element autorization__button'>{props.buttonTex}
      </button>
      <p className='autorization__text'>{`${props.questText} зарегистрированы?`}
        <Link
          to={props.link}
          className='interactiv-element autorization__text autorization__text_link'>
          {props.linkText}
        </Link>
      </p>
    </div>
  );
}

export default Autorization;