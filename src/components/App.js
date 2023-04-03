import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { checkToken, register, login } from "../utils/auth";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      debugger
      api
        .getProfile()
        .then((data) => {
          const {name, about, avatar, _id, email} = data;
          setCurrentUser({name, about, avatar, _id, email});
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCloseAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const isOwn = card.owner === currentUser._id;

    api
      .removeCard(card._id, isOwn)
      .then(setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about: description }) {
    api
      .editProfile({
        name,
        about: description,
      })
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((data) => {
        const {data: {name, about, avatar, _id}} = data;
          setCurrentUser({name, about, avatar, _id});
      })
      .then(() => {
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    checkToken()
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  const signOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={loggedIn} onSignOut={signOut} />
      <Routes>
        <Route path="/signin" element={<Login onLogin={login} onEmail={setEmail} onLoggedIn={setLoggedIn} />} />
        <Route
          path="/signup"
          element={
            <Register onRegister={register} onInfoTooltipOpen={setIsInfoTooltipOpen} onRegistered={setRegistered} />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={loggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={handleCloseAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handleCloseAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={handleCloseAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <PopupWithForm title="Вы уверены?" name="delete-card" btnText="Да">
        <button className="popup__save-button" type="submit">
          Да
        </button>
      </PopupWithForm>
      <InfoTooltip
        isRegistered={registered}
        isOpen={isInfoTooltipOpen}
        onClose={handleCloseAllPopups}
        success={"Вы успешно зарегистрировались!"}
        fail={"Что-то пошло не так! Попробуйте еще раз."}
      />
      {selectedCard && <ImagePopup card={selectedCard} onClose={handleCloseAllPopups} />}
    </CurrentUserContext.Provider>
  );
}
