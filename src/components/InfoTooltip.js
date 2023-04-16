import regSuccess from '../images/reg-success.png';
import regError from '../images/reg-error.png';
import { useNavigate } from 'react-router-dom';

function InfoTooltip(props) {

  const navigate = useNavigate();

  function handleCloseBtn() {
    props.onClose();
    props.registrationSucces && navigate('/sign-in', { replace: true });
  }

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id="popup_delete">
      <div className="popup__container">
        <img className="popup__image" src={props.registrationSucces ? regSuccess : regError} />
        <h2 className="popup__title popup__title-reg">{props.registrationSucces ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}</h2>
        <button className="popup__close-btn" onClick={handleCloseBtn} id="popup__close-btn_delete" type="button"
          aria-label="Кнопка закрытия формы"></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
