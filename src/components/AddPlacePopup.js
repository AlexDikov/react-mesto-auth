import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";

export default function AddPlacePopup(props) {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ place, link });
  }
  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={props.isOpen && "popup_opened"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_field_name"
        type="text"
        name="place"
        placeholder="Название"
        required
        minLength="2"
        maxLength="40"
        value={place || ""}
        onChange={handlePlaceChange}
      />
      <span className="popup__input-error popup__input-error_first"></span>
      <input
        className="popup__input popup__input_field_job"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span className="popup__input-error popup__input-error_second"></span>
      <button className="popup__save-button" type="submit" onSubmit={handleSubmit}>
        Создать
      </button>
    </PopupWithForm>
  );
}
