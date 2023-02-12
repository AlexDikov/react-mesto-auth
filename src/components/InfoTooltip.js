import accept from "../images/deny.svg";

export default function InfoTooltip() {
  return (
    <div className="popup popup_opened">
      <div className="popup__container">
        <img src="" />
        <h2 className="popup__title">{props.title}</h2>
      </div>
    </div>
  );
}
