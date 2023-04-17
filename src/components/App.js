import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import * as auth from '../utils/auth.js';
import regSuccess from '../images/reg-success.png';
import regError from '../images/reg-error.png';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [headerEmail, setHeaderEmail] = useState('');
  const [authStatusText, setAuthStatusText] = useState('');
  const [authStatusImage, setAuthStatusImage] = useState('');

  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  //Создаем эффект, который будет отслеживать ширину окна.
  //Далее мы сможем использовать это, чтобы дополнительный блок меню в шапке исчезал при увеличении ширины окна

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getCardList()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoading(true);
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setHeaderEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/sign-in", { replace: true })
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

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
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleRegistrationSuccess() {
    setIsRegisterPopupOpen(true);
    setAuthStatusText('Вы успешно зарегистрировались!');
    setAuthStatusImage(regSuccess);
  }

  function handleRegistrationError() {
    setIsRegisterPopupOpen(true);
    setAuthStatusText('Что-то пошло не так! Попробуйте еще раз.');
    setAuthStatusImage(regError);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsRegisterPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDeleteClick(card) {
    setIsDeletePlacePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api.removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);

    api.setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);

    api.changeAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);

    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogout(state) {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
    setLoggedIn(state);
    setHeaderEmail('');
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then((res) => {
        if (res) {
          handleRegistrationSuccess();
          navigate('/sign-in', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        handleRegistrationError();
      });
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setHeaderEmail(email);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        handleRegistrationError();
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/sign-in" element={<Header
            headerLinkName="Регистрация"
            headerLinkUrl="/sign-up"
            onSignOut={handleLogout}
            headerEmail={headerEmail}
            isLoading={isLoading}
            loggedIn={loggedIn}
          />} />
          <Route path="/sign-up" element={<Header
            headerLinkName="Войти"
            headerLinkUrl="/sign-in"
            onSignOut={handleLogout}
            headerEmail={headerEmail}
            isLoading={isLoading}
            loggedIn={loggedIn}
          />} />
          <Route path="/" element={<Header
            headerLinkName="Выйти"
            headerLinkUrl="/sign-in"
            onSignOut={handleLogout}
            headerEmail={headerEmail}
            isLoading={isLoading}
            loggedIn={loggedIn}
            width={width}
          />} />
        </Routes>
        <Routes>
          <Route path="/" element={loggedIn ? <ProtectedRouteElement
            element={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            setCards={setCards}
            cards={cards}
            onCardDelete={handleCardDeleteClick}
          /> : <Navigate to="/sign-in" replace />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} isLoading={isLoading} setHeaderEmail={setHeaderEmail} submitError={handleRegistrationError} />} />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={selectedCard}
          isLoading={isLoading}
        />

        <InfoTooltip
          isOpen={isRegisterPopupOpen}
          authStatusText={authStatusText}
          authStatusImage={authStatusImage}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
