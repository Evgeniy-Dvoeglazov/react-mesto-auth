import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

function AddPlacePopup(props) {

  const { register, formState: { errors, isValid }, getValues, reset } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  const errorClassname = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`;

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: getValues('name'),
      link: getValues('link')
    });
    reset();
  }

  const onClosePopup = () => {
    props.onClose();
    reset();
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={onClosePopup}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Создать"
      isValid={isValid}
      children={
        <>
          <input className="popup__input" type="text" placeholder="Название"
            {...register('name', {
              required: 'Заполните это поле.',
              minLength: {
                value: 2,
                message: 'Текст должен быть не короче 2 символов.'
              },
              maxLength: {
                value: 30,
                message: 'Текст должен быть не длиннее 30 символов.'
              }
            })}
          />
          {errors.name && <span className={errorClassname('name')}>{errors.name.message}</span>}
          <input className="popup__input" type="url" placeholder="Ссылка на картинку"
            {...register('link', {
              required: 'Заполните это поле.',
              pattern: {
                value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                message: 'Введите ссылку'
              }
            })}
          />
          {errors.link && <span className={errorClassname('link')}>{errors.link.message}</span>}
        </>
      }
    />
  );
}

export default AddPlacePopup;
