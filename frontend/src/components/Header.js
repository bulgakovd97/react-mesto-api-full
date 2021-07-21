import headerLogo from "../images/header__logo.svg";
import { Link, Route, Switch } from "react-router-dom";

function Header({userEmail, onLogout}) {
  function handleLogout() {
    onLogout();
  }

  return (
    <header className="header">
      <img className="header__logo" alt="Mesto" src={headerLogo} />
      <Switch>
        <Route path="/sign-up">
          <Link className="header__action" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__action" to="/sign-up">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__action-container">
            <p className="header__email">{`${userEmail}`}</p>
            <Link className="header__action header__action_logout" to="/sign-in" onClick={handleLogout}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
