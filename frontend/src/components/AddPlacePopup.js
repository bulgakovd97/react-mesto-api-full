import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");

  const [link, setLink] = React.useState("");

  function handleTitleInputChange(evt) {
    setTitle(evt.target.value);
  }

  function handleLinkInputChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: title,
      link: link,
    });

    setTitle("");
    setLink("");
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      label="Попап добавления карточки"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_title"
        id="title-input"
        type="text"
        name="name"
        value={title}
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleTitleInputChange}
      />
      <span className="popup__error title-input-error"></span>
      <input
        className="popup__input popup__input_type_link"
        id="url-input"
        type="url"
        name="link"
        value={link}
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkInputChange}
      />
      <span className="popup__error url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
