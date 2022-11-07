import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile(props) {
  const [isInput, setIsInput] = useState(false);
  useEffect(() => {
    props.chekCurrentRoute('/profile');
  }, [props]);

  const handlerInput = () => { setIsInput(!isInput) }

  return (
    <div className='profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <form id='profile-form' className='profile__container'>
        <div className='profile__info profile__info_bottom-line'>
          <label className='profile__info-user profile__info-user_label'>Имя</label>
          <input
            className={`profile__input ${isInput && 'profile__input_active interactiv-element'}`}
            type='text'
            name='name'
            //value={props.name}
            id='profile-name-input'
            placeholder='Имя'
            minLength='2'
            maxLength='30'
            />
          <p
            className={`profile__info-user ${isInput && 'profile__info-user_invisible'}`}>
            {props.name}
          </p>
        </div>
        <div className='profile__info'>
          <label className='profile__info-user profile__info-user_label'>E-mail</label>
          <input
            className={`profile__input ${isInput && 'profile__input_active interactiv-element'}`}
            type='email'
            name='email'
            //value={props.email}
            id='profile-email-input'
            placeholder='Email'
            autoComplete='on'
            />
          <p
            className={`profile__info-user ${isInput && 'profile__info-user_invisible'}`}>
            {props.email}
          </p>
        </div>
      </form>
      <button
        form='profile-form'
        type={isInput ? 'button' : 'submit'}
        className={`interactiv-element profile__button ${isInput && 'profile__button_submit'}`}
        onClick={handlerInput}>
        {isInput ? 'Сохранить' : 'Редактировать'}
      </button>

      <Link to='/' className='interactiv-element link profile__exit'>Выйти из аккаунта</Link>
    </div>
  );
}

export default Profile;