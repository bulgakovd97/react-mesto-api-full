function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_view ${props.card ? "popup_opened" : ""}`}
      aria-label="Попап просмотра фотографии"
    >
      <div className="popup__content">
        <div className="popup__view-container">
          <img src={props.card?.link} alt={props.card?.name} className="popup__image" />
          <h2 className="popup__title popup__title_type_view">{props.card?.name}</h2>
          <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        </div>
      </div>
    </section>
  );
}

export default ImagePopup;
