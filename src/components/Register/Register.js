import { useEffect } from 'react';
import Autorization from '../Autorization/Autorization';
import './Register.css';

function Register(props) {
  useEffect(() => {
    props.chekCurrentRoute('/sign');
  }, [props]);
  return (
    <Autorization
      titleText={'Добро пожаловать!'}
      buttonTex={'Зарегистрироваться'}
      questText={'Уже'}
      link={'/signin'}
      linkText={'Войти'}
    >
      <label className='autorization__label'>Имя</label>
      <input
        type='text'
        name='name'
        id='user-name-input'
        className='interactiv-element autorization__input'
        placeholder='Имя'
        minLength='2'
        maxLength='30'
        required />
      <label className='autorization__label'>E-mail</label>
      <input
        type='email'
        name='email'
        id='autorization-email-input'
        className='interactiv-element autorization__input'
        placeholder='Email'
        autoComplete='on'
        required />
      <label className='autorization__label'>Пароль</label>
      <input
        type='password'
        name='password'
        id='user-password-input'
        autoComplete='on'
        className='interactiv-element autorization__input autorization__input_password'
        placeholder='Пароль'
        required />
      <span className='autorization__label autorization__label_error'>Что-то пошло не так...</span>
    </Autorization>
  );
}

export default Register;