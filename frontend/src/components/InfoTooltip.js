function InfoTooltip(props) {
  return (
    <section className={`popup popup_type_info ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <div className={`popup__register-${props.infoMessage.image}`}></div>
        <p className="popup__register-text">{props.infoMessage.text}</p>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
