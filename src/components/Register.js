import Form from './Form';
import { Link } from 'react-router-dom';
import * as auth from '../auth.js';
import { useForm } from 'react-hook-form';

function Register(props) {

  const { register, formState: { errors, isValid }, getValues } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  const errorClassname = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(getValues('password'), getValues('email'))
      .then((res) => {
        if (!res.data) {
          props.submitError();
        }
        else props.submitSuccess();
      });
  }

  return (
    <div className="form">
      <h2 className="form__title">Регистрация</h2>
      <Form
        name="register"
        formType="withoutPopup"
        isValid={isValid}
        buttonText={"Зарегистрироваться"}
        onSubmit={handleSubmit}
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
                required: 'Заполните это поле.',
                minLength: {
                  value: 5,
                  message: 'Текст должен быть не короче 5 символов.'
                },
                maxLength: {
                  value: 12,
                  message: 'Текст должен быть не длиннее 12 символов.'
                }
              })}
            />
            {errors.password && <span className={errorClassname('password')}>{errors.password.message}</span>}
          </>
        }
      />
      <p className="form__question">Уже зарегистрированы? <Link className="form__link" to="/sign-in">Войти</Link></p>
    </div>
  );
}

export default Register;
