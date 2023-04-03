import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Header(props) {
  const location = useLocation();
  const [link, setLink] = useState("");
  const [btnName, setBtnName] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (location.pathname === "/signin") {
      setLink("/signup");
      setBtnName("Зарегистрироваться");
      return;
    } else if (location.pathname === "/signup")
    {
      setLink("/signin");
      setBtnName("Войти");
    }
  }, [location]);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className="header__profile">
        <p className="header__email">{props.isLoggedIn && currentUser.email}</p>
        {props.isLoggedIn ? (
          <Link className="header__btn" to="/signin" onClick={props.onSignOut}>
            Выйти
          </Link>
        ) : (
          <Link className="header__btn" to={link}>
            {btnName}
          </Link>
        )}
      </div>
    </header>
  );
}
