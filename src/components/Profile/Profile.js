import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import { useValidation } from '../../utils/Validation';

function Profile(props) {

  const { handleChange, values, errors, resetForm, isValid } = useValidation();
  const currentUser = useContext(CurrentUserContext);
  const [onEdit, setOnEdit] = useState(false);
  const errorsMessage = errors.email !== '' ? errors.prompt.email : errors.prompt.name;
  const isRepeat = ((values.name === currentUser.name && values.email === currentUser.email) || (values.name === '' || values.email === ''));
  const errorActive = (errors.email !== '' || errors.name !== '')

  function onSubmitForm(e) {
    e.preventDefault();
    const { name, email } = values;
    props.onUpdateUser({ name, email });
    resetForm();
  }
  const handlerInput = () => {
    setOnEdit(!onEdit)
  }

  return (
    <div className='profile'>
      <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
      <form
        id='profile-form'
        className='profile__container'
        onSubmit={onSubmitForm}
      >
        <div className='profile__info profile__info_bottom-line'>
          <label className='profile__info-user profile__info-user_label'>Имя</label>
          <input
            className={`profile__input ${onEdit && 'profile__input_active interactiv-element'}`}
            value={values.name === '' ? currentUser.name : values.name}
            onChange={handleChange}
            type='text'
            name='name'
            id='profile-name-input'
            placeholder='Имя'
            pattern='^[A-Za-zА-Яа-яЁё\s-]+$'
            minLength='2'
            maxLength='30'
            required
          />
          <p
            className={`profile__info-user ${onEdit && 'profile__info-user_invisible'}`}>
            {currentUser.name}
          </p>
        </div>

        <div className='profile__info'>
          <label className='profile__info-user profile__info-user_label'>E-mail</label>
          <input
            className={`profile__input ${onEdit && 'profile__input_active interactiv-element'}`}
            type='email'
            name='email'
            value={values.email === '' ? currentUser.email : values.email}
            onChange={handleChange}
            pattern="([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z_-]{2,8})"
            id='profile-email-input'
            placeholder='Email'
            autoComplete='on'
            required
          />
          <p
            className={`profile__info-user ${onEdit && 'profile__info-user_invisible'}`}>
            {currentUser.email}
          </p>
        </div>
      </form>

      <span
        className='autorization__label autorization__label_error'
        style={{ opacity: (errorActive || isRepeat && isValid) && 1 }} >
        {isRepeat ? errors.prompt.repeat : errorsMessage}
      </span>

      <button
        form='profile-form'
        type={onEdit ? 'button' : 'submit'}
        className={`interactiv-element profile__button ${onEdit && 'profile__button_submit'}`}
        style={{
          background: (!isValid || isRepeat) && '#262525',
          color: (!isValid || isRepeat) && '#444',
          cursor: (!isValid || isRepeat) && 'auto'
        }}
        onClick={handlerInput}
        disabled={onEdit && (!isValid || isRepeat)}>
        {onEdit ? 'Сохранить' : 'Редактировать'}
      </button>

      <button
        type='button'
        onClick={props.onSignOut}
        className="interactiv-element profile__button profile__button_exit"
        aria-label='Выйти'>
        Выйти из аккаунта
      </button>
    </div>
  );
}

export default Profile;