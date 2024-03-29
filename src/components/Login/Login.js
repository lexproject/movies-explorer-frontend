import Autorization from '../Autorization/Autorization';
import { useValidation } from '../../utils/Validation';
import './Login.css';

function Login(props) {

  const { handleChange, values, errors, isValid } = useValidation();
  function onSubmit(e) {
    e.preventDefault();
    props.onSignin({ email: values.email, password: values.password });
    props.isDisabled();
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
      buttonSendSatus={props.elementDisabledStatus}
    >
      <label className='autorization__label'>E-mail</label>
      <input
        type='email'
        name='email'
        pattern="([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z_-]{2,8})"
        id='autorization-email-input'
        className='interactiv-element autorization__input'
        value={values.email}
        onChange={handleChange}
        placeholder='Email'
        autoComplete='on'
        required
        disabled={props.elementDisabledStatus}
      />
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
        required
        disabled={props.elementDisabledStatus}
      />
      <span
        className='autorization__label autorization__label_error'
        style={{ opacity: 1 }} >
        {errors.password}</span>
    </Autorization>
  );
}

export default Login;