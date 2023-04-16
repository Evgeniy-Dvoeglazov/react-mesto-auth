import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__btn-like ${isLiked && 'element__btn-like_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <li className="element" >
      <div className="element__image" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick}>
      </div>
      <div className="element__description">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} type="button" aria-label="Кнопка поставить лайк" onClick={handleLikeClick}></button>
          <p className="element__like-quantity">{props.card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button className="element__delete-btn" onClick={handleDeleteClick} type="button" aria-label="Кнопка удаления карточки места" />}
    </li>
  );
}

export default Card;
