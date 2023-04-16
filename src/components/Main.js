import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">

      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            <button className="profile__avatar-btn" onClick={props.onEditAvatar} type="button" aria-label="Кнопка изменения аватара"></button>
            <div className="profile__avatar-image" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
            </div>
          </div>
          <div className="profile__description">
            <div className="profile__title">
              <h1 className="profile__title-text">{currentUser.name}</h1>
              <button className="profile__edit-btn" onClick={props.onEditProfile} type="button"
                aria-label="Кнопка открытия формы редактирования профиля"></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-btn" onClick={props.onAddPlace} type="button" aria-label="Кнопка создания новой карточки места"></button>
      </section>

      <section className="elements" aria-label="Подборка карточек с фотографиями и названиями красивых мест">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
      <section className="elements" aria-label="Подборка карточек с фотографиями и названиями красивых мест">
      </section>
    </main>
  );
}

export default Main;
