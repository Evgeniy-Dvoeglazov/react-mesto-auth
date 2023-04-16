function Form(props) {
  return (
    <form className="popup__form" id={`popup__form_${props.name}`} onSubmit={props.onSubmit} name={`${props.name}Form`} noValidate>
      {props.children}
      <button className={`popup__button popup__button_${props.formType} ${props.isValid ? '' : 'popup__button_disabled'}`} disabled={props.isLoading} type="submit" id={`popup${props.name}__button`}>{props.isLoading ? 'Сохранение...' : props.buttonText}</button>
    </form>
  );
}

export default Form;
