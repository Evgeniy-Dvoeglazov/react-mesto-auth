import Form from './Form';
import { useNavigate } from 'react-router-dom';
import * as auth from '../auth.js';
import { useForm } from 'react-hook-form';

function Login(props) {

  const { register, formState: { errors, isValid }, getValues } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  const errorClassname = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`;

  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    if (!getValues('email') || !getValues('password')) {
      return;
    }
    auth.authorize(getValues('password'), getValues('email'))
      .then((data) => {
        if (data.token) {
          props.handleLogin(true);
          props.tokenCheck();
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className={`${props.isLoading ? "form_off" : "form"}`}>
      <h2 className="form__title">Вход</h2>
      <Form
        name="login"
        formType="withoutPopup"
        isValid={isValid}
        buttonText={"Войти"}
        onSubmit={onLogin}
        children={
          <>
            <input className="form__input" name="email" type="email" placeholder="Email"
              {...register('email', {
                required: 'Заполните это поле.',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Введите Email'
                }
              })}
            />
            {errors.email && <span className={errorClassname('email')}>{errors.email.message}</span>}
            <input className="form__input" name="password" type="password" placeholder="Пароль"
              {...register('password', {
                required: 'Заполните это поле.'
              })}
            />
            {errors.password && <span className={errorClassname('password')}>{errors.password.message}</span>}
          </>
        }
      />
    </div>
  );
}

export default Login;
