import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onCardDelete(props.card._id);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
      label="Попап подтверждения удаления карточки"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
