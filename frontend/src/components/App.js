import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { auth } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [deletedCard, setDeletedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [userInfo, setUserInfo] = React.useState({ email: "" });

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [infoMessage, setInfoMessage] = React.useState({ image: "", text: "" });

  const [isCardsLoading, setIsCardsLoading] = React.useState(false);

  const [isSending, setIsSending] = React.useState(false);

  const [isChecking, setIsChecking] = React.useState(true);
  
  const history = useHistory();

  function getInitialData(token) {
    setIsCardsLoading(true);
    
    api
      .getInitialData(token)
      .then((data) => {
        const [userData, cardsData] = data;

        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log("Ошибка загрузки начальных данных - " + err);
      })
      .finally(() => setIsCardsLoading(false));
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(card) {
    setIsDeleteCardPopupOpen(true);

    setDeletedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  React.useEffect(() => {
    document.addEventListener("keyup", handleEscUp);
    document.addEventListener("click", handleOverlayClick);

    return () => {
      document.removeEventListener("keyup", handleEscUp);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, []);

  function handleEscUp(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log("Ошибка постановки лайка/дизлайка - " + err));
  }

  function handleUpdateUser({ name, about }) {
    setIsSending(true);

    api
      .setUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);

        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка обновления данных пользователя - " + err))
      .finally(() => setIsSending(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsSending(true);

    api
      .changeAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);

        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка обновления аватара пользователя - " + err))
      .finally(() => setIsSending(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsSending(true);

    api
      .addCard(name, link)
      .then((cardsData) => {
        setCards([cardsData, ...cards]);

        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка добавления новой карточки - " + err))
      .finally(() => setIsSending(false));
  }

  function handleDeleteCardSubmit(id) {
    setIsSending(true);
    
    api
      .removeCard(id)
      .then(() => {
        setCards((cardsData) => cardsData.filter((card) => id !== card._id));

        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка удаления карточки - " + err))
      .finally(() => setIsSending(false));
  }

  function register(data) {
    return auth
      .register(data)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setInfoMessage({ image: "success", text: "Вы успешно зарегистрировались!" });
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoMessage({ image: "fail", text: `Ошибка ${err.status} - некорректно заполнено одно из полей` });
      });
  }

  function login({ password, email }) {
    return auth
      .authorize({ password, email })
      .then(({ token }) => {
        if (token) {
          localStorage.setItem("jwt", token);
          history.push("/");
          setIsLoggedIn(true);
          setUserInfo({ email });
          
          getInitialData(token);
        } else {
          return;
        }
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setInfoMessage({ image: "fail", text: "Что-то пошло не так! Попробуйте ещё раз." });
      })
      .finally(() => setIsChecking(false));
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    
    if (!jwt) {
      setIsChecking(false);
    } else {
      getInitialData(jwt);

    auth
      .getContent(jwt)
      .then((data) => {
        return data;
      })
      .then(({ email }) => {
        setUserInfo({ email });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoMessage({ image: "fail", text: `Ошибка ${err.status} - переданный токен некорректен` });
        logout();
      })
      .finally(() => setIsChecking(false));
    }  
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
      setIsChecking(false);
    }
  }, [isLoggedIn, history]);

  function logout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <div className="container">
            <Header userEmail={userInfo.email} onLogout={logout} />

            <Switch>
              <ProtectedRoute
                exact
                path="/"
                isLoggedIn={isLoggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardPreview={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}
                isCardsLoading={isCardsLoading}
                isChecking={isChecking}
              />
              <Route path="/sign-up">
                <Register onRegister={register} />
              </Route>
              <Route path="/sign-in">
                <Login onLogin={login} />
              </Route>
              <Route>{isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
            </Switch>

            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isSending={isSending}
            />

            <AddPlacePopup 
              isOpen={isAddPlacePopupOpen} 
              onClose={closeAllPopups} 
              onAddPlace={handleAddPlaceSubmit} 
              isSending={isSending}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isSending={isSending}
            />

            <DeleteCardPopup
              card={deletedCard}
              isOpen={isDeleteCardPopupOpen}
              onClose={closeAllPopups}
              onCardDelete={handleDeleteCardSubmit}
              isSending={isSending}
            />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            <InfoTooltip isOpen={isInfoTooltipOpen} infoMessage={infoMessage} onClose={closeAllPopups} />
          </div>
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
