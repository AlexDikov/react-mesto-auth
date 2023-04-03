import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const {
    card: { name, link, likes, owner },
  } = props;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = owner === currentUser._id;
  const isLiked = likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element-place__like-button ${isLiked && "element-place__like-button_active"}`;

  return (
    <div className="element">
      {isOwn && (
        <button
          className="element__delete-button element__delete-button_active"
          aria-label="удалить карточку"
          onClick={handleDeleteClick}
        />
      )}
      <img className="element__image" style={{ objectFit: "cover" }} onClick={handleClick} src={link} alt={name} />
      <div className="element-place">
        <h2 className="element-place__name">{name}</h2>
        <div className="element-place__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="element-place__like-counter">{likes.length}</p>
        </div>
      </div>
    </div>
  );
}
