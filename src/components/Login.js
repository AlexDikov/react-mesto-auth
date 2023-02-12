import { useState } from "react";

export default function Login(props) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const login = (email, password) => {
    fetch(`${props.baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify({ email, password }),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    login(email, password);
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