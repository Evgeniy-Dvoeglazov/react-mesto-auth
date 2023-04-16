import { useEffect } from 'react';

function DeletePlacePopup(props) {

  useEffect(() => {
    function ClosePopupOnEsc(evt) {
      if ((evt.key === 'Escape') && props.isOpen) {
        props.onClose();
      }
    }
    if (props.isOpen) {
      document.addEventListener('keydown', ClosePopupOnEsc);

      return () => {
        document.removeEventListener('keydown', ClosePopupOnEsc);
      };
    }
  });

  useEffect(() => {
    function ClosePopupOnOverlay(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        props.onClose();
      }
    }
    if (props.isOpen) {
      document.addEventListener('mousedown', ClosePopupOnOverlay);

      return () => {
        document.removeEventListener('mousedown', ClosePopupOnOverlay);
      };
    }
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id="popup_delete">
      <div className="popup__container">
        <h2 className="popup__title popup__title-delete">Вы уверены?</h2>
        <form className="popup__form" onSubmit={handleSubmit} name="deleteForm">
          <button className="popup__button popup__button_delete-card" type="submit" disabled={props.isLoading}>{props.isLoading ? 'Сохранение...' : 'Да'}</button>
        </form>
        <button className="popup__close-btn" onClick={props.onClose} id="popup__close-btn_delete" type="button"
          aria-label="Кнопка закрытия формы"></button>
      </div>
    </div>
  );
}

export default DeletePlacePopup;
