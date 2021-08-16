import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "../hooks/useForm"; 

function EditAvatarPopup(props) {
  const { values, errors, isValid, handleInputChange, resetForm } = useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar(values);
  };
  
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      label="Попап обновления аватара"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid || props.isSending}
    >
      <input
        className="popup__input popup__input_type_avatar"
        id="avatar-input"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        minLength="2"
        maxLength="200"
        value={values.avatar || ""}
        onChange={handleInputChange}
      />
      <span className={`popup__error avatar-input-error ${!isValid && "popup__error_visible"}`}>
          {errors.avatar || ""}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
