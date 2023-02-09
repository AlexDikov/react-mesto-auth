export default function ImagePopup(props) {
  const {
    card: { name, link },
  } = props;
  return (
    <div className="popup popup_zoom-pic popup_opened" style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
      <figure className="popup__figure-container">
        <img className="popup__picture" src={link} alt={name} />
        <figcaption className="popup__picture-cap">{name}</figcaption>
        <button className="popup__close-button" type="button" aria-label="закрыть" onClick={props.onClose}></button>
      </figure>
    </div>
  );
}
