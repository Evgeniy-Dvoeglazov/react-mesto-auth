import { apiConfig } from './utils.js';

class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получаем данные о пользователе с сервера

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  // Получаем массив карточек с сервера

  getCardList() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  // Изменяем данные о пользлвателе на сервере

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  // Передаем данные новой карточки

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  // Удаляем данные карточки

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  // Добавляем и удаляем лайк

  changeLikeCardStatus(cardId, likeStatus) {
    if (likeStatus) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then((res) => {
          return this._checkResponse(res);
        });
    } else
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then((res) => {
          return this._checkResponse(res);
        });
  }

  // Отправляем ссылку на смену аватара

  changeAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }
}

const api = new Api(apiConfig);
export { api };
