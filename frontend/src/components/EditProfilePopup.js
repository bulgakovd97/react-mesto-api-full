import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");

  const [description, setDescription] = React.useState("");

  function handleNameInputChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionInputChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      label="Попап редактирования профиля"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        id="name-input"
        type="text"
        name="name"
        value={name}
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleNameInputChange}
      />
      <span className="popup__error name-input-error"></span>
      <input
        className="popup__input popup__input_type_about"
        id="about-input"
        type="text"
        name="about"
        value={description}
        placeholder="Занятие"
        required
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionInputChange}
      />
      <span className="popup__error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
