import { useEffect } from 'react';
import './Login.css';
import Autorization from '../Autorization/Autorization';

function Login(props) {
  useEffect(() => {
    props.chekCurrentRoute('/sign');
  }, [props]);

  return (
    <Autorization
      titleText={'Рады видеть!'}
      buttonTex={'Войти'}
      questText={'Ещё не'}
      link={'/signup'}
      linkText={'Регистрация'}
    >
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

export default Login;