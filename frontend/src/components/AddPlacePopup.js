import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "../hooks/useForm";

function AddPlacePopup(props) {
  const { values, errors, isValid, handleInputChange, resetForm } = useFormWithValidation();

  React.useEffect(() => {
    resetForm()
  }, [props.isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace(values);
  };

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      label="Попап добавления карточки"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid || props.isSending}
    >
      <input
        className="popup__input popup__input_type_title"
        id="title-input"
        type="text"
        name="name"
        value={values.name || ""}
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleInputChange}
      />
      <span className={`popup__error title-input-error ${!isValid && "popup__error_visible"}`}>
        {errors.name || ""}
      </span>
      <input
        className="popup__input popup__input_type_link"
        id="url-input"
        type="url"
        name="link"
        value={values.link || ""}
        placeholder="Ссылка на картинку"
        required
        onChange={handleInputChange}
      />
      <span className={`popup__error url-input-error ${!isValid && "popup__error_visible"}`}>
        {errors.link || ""}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
