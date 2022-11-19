import { useEffect } from 'react';
import './Login.css';
import Autorization from '../Autorization/Autorization';
import { useValidation } from '../../utils/Validation';

function Login(props) {
  useEffect(() => {
    props.chekCurrentRoute('/sign');
  }, [props]);


  const { handleChange, values, errors, resetForm, isValid } = useValidation();
  function onSubmit(e) {
    e.preventDefault();
    props.onSignin({ email: values.email, password: values.password });
    resetForm();
  }

  return (
    <Autorization
      titleText={'Рады видеть!'}
      buttonTex={'Войти'}
      questText={'Ещё не'}
      link={'/signup'}
      linkText={'Регистрация'}
      onSubmit={onSubmit}
      isValid={isValid}
    >
      <label className='autorization__label'>E-mail</label>
      <input
        type='email'
        name='email'
        pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
        id='autorization-email-input'
        className='interactiv-element autorization__input'
        value={values.email}
        onChange={handleChange}
        placeholder='Email'
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
        required />
      <span
        className='autorization__label autorization__label_error'
        style={{ opacity: 1 }} >
        {errors.password}</span>
    </Autorization>
  );
}

export default Login;