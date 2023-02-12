import logo from "../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <button className="header__btn">Войти</button>
    </header>
  );
}
