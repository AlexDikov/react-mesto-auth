import { useState } from "react";
import { login } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    login(email, password)
      .then((res) => {
        if (res.ok) {
          props.onEmail(email);
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        debugger
      })
      .then(() => {
        props.onLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input login__input_field_name"
            type="email"
            name="email"
            placeholder="Email"
            required
            minLength="2"
            maxLength="40"
            value={formValue.email || ""}
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
            value={formValue.password || ""}
            onChange={handleChange}
          />
          <span className="login__input-error login__input-error_second"></span>
          <button className="login__save-button" type="submit" onSubmit={handleSubmit}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
