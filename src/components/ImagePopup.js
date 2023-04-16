import { useEffect } from 'react';

function ImagePopup(props) {

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

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id="popup_photo">
      <div className="popup__photo-container">
        <figure className="popup__figure">
          <img src={props.card.link} className="popup__large-photo" alt={props.card.name} />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
        <button className="popup__close-btn" onClick={props.onClose} id="popup__close-btn_largePhoto" type="button"
          aria-label="Кнопка закрытия формы"></button>
      </div>
    </div>
  );
}

export default ImagePopup;
