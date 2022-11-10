import { useEffect, useState } from 'react';
import './AlertMessage.css';

const AlertMessage = (props) => {
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, [props, isError]);

  function changeStatusMessage() {
    setIsError(false)
  }

  return (
    <div className={`alert-message ${isError && 'alert-message_active'}`}>
    <button className='alert-message__button' onClick={changeStatusMessage}></button>
      <h2 className='alert-message__title'> Что-то пошло не так!</h2>
      <p className='alert-message__text'>{props.message}</p>
      </div>
  )
}

export default AlertMessage;