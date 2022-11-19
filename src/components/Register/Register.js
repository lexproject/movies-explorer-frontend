import { useEffect } from 'react';
import Autorization from '../Autorization/Autorization';
import './Register.css';
import { useValidation } from '../../utils/Validation';

function Register(props) {
  useEffect(() => {
    props.chekCurrentRoute('/sign');
  }, [props]);

  const { handleChange, values, errors, resetForm, isValid } = useValidation();
  function onSubmit(e) {
    e.preventDefault();
    props.onSignup(values);
    resetForm();
  }
  return (
    <Autorization
      titleText={'Добро пожаловать!'}
      buttonTex={'Зарегистрироваться'}
      questText={'Уже'}
      link={'/signin'}
      linkText={'Войти'}
      onSubmit={onSubmit}
      isValid={isValid}
    >
      <label className='autorization__label'>Имя</label>
      <input
        type='text'
        name='name'
        id='user-name-input'
        className='interactiv-element autorization__input'
        value={values.name}
        onChange={handleChange}
        placeholder='Имя'
        pattern='^[A-Za-zА-Яа-яЁё\s-]+$'
        minLength='2'
        maxLength='30'
        required />
      <span
        className='autorization__label autorization__label_error'
        style={{ opacity: (errors.name !== '') && 1 }} >
        {errors.name + errors.prompt.name}</span>
      <label className='autorization__label'>E-mail</label>
      <input
        type='email'
        name='email'
        id='autorization-email-input'
        className='interactiv-element autorization__input'
        value={values.email}
        onChange={handleChange}
        placeholder='Email'
        pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
        autoComplete='on'
        required />
      <span
        className='autorization__label autorization__label_error'
        style={{ opacity: (errors.email !== '') && 1 }} >
        {errors.email + errors.prompt.email}</span>
      <label className='autorization__label'>Пароль</label>
      <input
        type='password'
        name='password'
        id='user-password-input'
        autoComplete='on'
        className='interactiv-element autorization__input autorization__input_password'
        value={values.password}
        onChange={handleChange}
        placeholder='Пароль'
        minLength='6'
        maxLength='30'
        required />
      <span
        className='autorization__label autorization__label_error'
        style={{ opacity: 1 }} >
        {errors.password}</span>
    </Autorization>
  );
}

export default Register;