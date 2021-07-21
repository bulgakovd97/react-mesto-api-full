import React from "react";

function Login({ onLogin }) {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onLogin(loginData);
  }

  return (
    <section className="sign-up-in" aria-label="Регистрация">
      <div className="sign-up-in__container">
        <h2 className="sign-up-in__title">Вход</h2>
        <form className="sign-up-in__form" id="login-form" name="login-form" onSubmit={handleSubmit}>
          <fieldset className="sign-up-in__form-set">
            <input
              className="sign-up-in__input sign-up-in__input_type_email"
              id="email-input"
              type="email"
              name="email"
              value={loginData.email}
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
              value={loginData.password}
              placeholder="Пароль"
              required
              minLength="5"
              maxLength="20"
              onChange={handleChange}
            />
            <button className="sign-up-in__button" type="submit">
              Войти
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default Login;
