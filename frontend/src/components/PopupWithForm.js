function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      aria-label={props.label}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          id={`${props.name}-form`}
          name={`${props.name}-form`}
          onSubmit={props.onSubmit}
        >
          <fieldset className="popup__form-set">
            {props.children}
            <button className="popup__button" type="submit">
              {props.buttonText}
            </button>
          </fieldset>
        </form>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
