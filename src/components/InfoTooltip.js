function InfoTooltip(props) {

  function handleCloseBtn() {
    props.onClose();
  }

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id="popup_delete">
      <div className="popup__container">
        <img className="popup__image" src={props.authStatusImage} />
        <h2 className="popup__title popup__title-reg">{props.authStatusText}</h2>
        <button className="popup__close-btn" onClick={handleCloseBtn} id="popup__close-btn_delete" type="button"
          aria-label="Кнопка закрытия формы"></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
