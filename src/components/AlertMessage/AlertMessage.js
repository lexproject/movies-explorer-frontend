import { useEffect, useState } from 'react';
import './AlertMessage.css';

const AlertMessage = ({ message }) => {

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError((message !== ''));
  }, [message]);

  function clearMessage() {
    setIsError(false)
  }

  return (
    <div className={`alert-message ${isError && 'alert-message_active'}`}>
      <button className='alert-message__button' onClick={clearMessage}></button>
      <h2 className='alert-message__title'> Внимание!</h2>
      <p className='alert-message__text'>{message}</p>
    </div>
  )
}

export default AlertMessage;