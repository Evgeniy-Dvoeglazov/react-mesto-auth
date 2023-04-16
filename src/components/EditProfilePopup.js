import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);

  const { register, formState: { errors, isValid }, getValues, setValue, reset } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  const errorClassname = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`;

  const onClosePopup = () => {
    props.onClose();
    reset({ 'userName': currentUser.name, 'userDescription': currentUser.about })
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: getValues('userName'),
      about: getValues('userDescription')
    });
  }

  useEffect(() => {
    setValue('userName', currentUser.name);
    setValue('userDescription', currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={onClosePopup}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isValid={isValid}
      children={
        <>
          <input className="popup__input" type="text" placeholder="Имя"
            {...register('userName', {
              required: 'Заполните это поле.',
              minLength: {
                value: 2,
                message: 'Текст должен быть не короче 2 символов.'
              },
              maxLength: {
                value: 40,
                message: 'Текст должен быть не длиннее 40 символов.'
              }
            })}
          />
          {errors.userName && <span className={errorClassname('userName')}>{errors.userName.message}</span>}
          <input className="popup__input" type="text" placeholder="О себе"
            {...register('userDescription', {
              required: 'Заполните это поле.',
              minLength: {
                value: 2,
                message: 'Текст должен быть не короче 2 символов.'
              },
              maxLength: {
                value: 200,
                message: 'Текст должен быть не длиннее 40 символов.'
              }
            })}
          />
          {errors.userDescription && <span className={errorClassname('userDescription')}>{errors.userDescription.message}</span>}
        </>
      }
    />
  );
}

export default EditProfilePopup;
