import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "../hooks/useForm";

function EditProfilePopup(props) {
  const { values, errors, isValid, handleInputChange, resetForm } = useFormWithValidation();

  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser(values);
  };

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [props.isOpen, currentUser, resetForm]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      label="Попап редактирования профиля"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid || props.isSending}
    >
      <input
        className="popup__input popup__input_type_name"
        id="name-input"
        type="text"
        name="name"
        value={values.name || ""}
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleInputChange}
      />
      <span className={`popup__error name-input-error ${!isValid && "popup__error_visible"}`}>
        {errors.name || ""}
      </span>
      <input
        className="popup__input popup__input_type_about"
        id="about-input"
        type="text"
        name="about"
        value={values.about || ""}
        placeholder="Занятие"
        required
        minLength="2"
        maxLength="200"
        onChange={handleInputChange}
      />
      <span className={`popup__error about-input-error ${!isValid && "popup__error_visible"}`}>
        {errors.about || ""}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
