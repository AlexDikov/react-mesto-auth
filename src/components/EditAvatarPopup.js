import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={props.isOpen && "popup_opened"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_field_job"
        type="url"
        name="place-link"
        placeholder="Ссылка на фотографию"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error popup__input-error_second popup__input-error_second-short"></span>
      <button className="popup__save-button" type="submit" onSubmit={handleSubmit}>
        Сохранить
      </button>
    </PopupWithForm>
  );
}
