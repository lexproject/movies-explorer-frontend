import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { InfoMessageContext } from '../../contexts/InfoMessageContext';
import './Autorization.css';

const Autorization = (props) => {
  const infoMessage = useContext(InfoMessageContext);
  return (
    <div className='blank-page autorization'>
      <Logo modClass={'sign'} />
      <h2 className='autorization__title'>{props.titleText}</h2>
      <form
        id='sign-form'
        action=""
        method="POST"
        onSubmit={props.onSubmit}
        className='autorization__form'
        disabled={!props.isValid}>
        {props.children}
      </form>
      <p className='autorization__text'>{infoMessage}</p>
      <button
        type='submit'
        form='sign-form'
        className={`interactiv-element autorization__button ${(!props.isValid || props.buttonSendSatus) && 'autorization__button_disabled'}`}
        disabled={!props.isValid || props.buttonSendSatus}
      >{props.buttonTex}
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