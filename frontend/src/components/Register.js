import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [registerData, setRegisterData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister(registerData);
  }

  return (
    <section className="sign-up-in" aria-label="Регистрация">
      <div className="sign-up-in__container">
        <h2 className="sign-up-in__title">Регистрация</h2>
        <form className="sign-up-in__form" id="register-from" name="register-from" onSubmit={handleSubmit}>
          <fieldset className="sign-up-in__form-set">
            <input
              className="sign-up-in__input sign-up-in__input_type_email"
              id="email-input"
              type="email"
              name="email"
              value={registerData.email}
              placeholder="Email"
              required
              minLength="9"
              maxLength="40"
              onChange={handleChange}
            />
            <input
              className="sign-up-in__input sign-up-in__input_type_password"
              id="password-input"
              type="password"
              name="password"
              value={registerData.password}
              placeholder="Пароль"
              required
              minLength="5"
              maxLength="20"
              onChange={handleChange}
            />
            <button className="sign-up-in__button" type="submit">
              Зарегистрироваться
            </button>
            <Link className="sign-up-in__caption" to="/sign-in">
              Уже зарегистированы? Войти
            </Link>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default Register;
