import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../utils/auth";

export default function Register(props) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    register(password, email)
      .then((res) => {
        if (res.ok) {
          props.onInfoTooltipOpen(true);
          props.onRegistered(true);
          return res.json();
        }
        props.onInfoTooltipOpen(true);
        props.onRegistered(false);
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(() => {
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input login__input_field_name"
            type="email"
            name="email"
            placeholder="Email"
            required
            minLength="2"
            maxLength="40"
            value={formValue.email}
            onChange={handleChange}
          />
          <span className="login__input-error login__input-error_first"></span>
          <input
            className="login__input login__input_field_job"
            type="password"
            name="password"
            placeholder="Пароль"
            required
            minLength="2"
            maxLength="200"
            value={formValue.password}
            onChange={handleChange}
          />
          <span className="login__input-error login__input-error_second"></span>
          <button className="login__save-button" type="submit" onSubmit={handleSubmit}>
            Зарегистрироваться
          </button>
        </form>
        <p style={{ fontSize: 14, marginLeft: 105 }}>
          Уже зарегистрированы?{" "}
          <Link className="login__btn" to="/signin">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
