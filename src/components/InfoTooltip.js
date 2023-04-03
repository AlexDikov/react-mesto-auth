import deny from "../images/deny.svg";
import accept from "../images/accept.svg";

export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <img className="popup__icon" src={props.isRegistered ? accept : deny} alt="иконка"/>
        <h2 className="popup__title popup__aware">{props.isRegistered ? props.succes : props.fail}</h2>
        <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="закрыть"></button>
      </div>
    </div>
  );
}
