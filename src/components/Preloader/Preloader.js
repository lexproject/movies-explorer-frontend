import React, { useContext } from 'react';
import { InfoMessageContext } from '../../contexts/InfoMessageContext';
import './Preloader.css';

const Preloader = () => {
  const infoMessage = useContext(InfoMessageContext);
  return (
    <div className='preloader'>
      <div className='preloader__container'>
        {infoMessage !== '' ? <p className='preloader__text'>{infoMessage}</p> :
          <span className='preloader__round'></span>}
      </div>
    </div>
  )
};

export default Preloader
