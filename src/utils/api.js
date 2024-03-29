class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrlUser = `${baseUrl}/users/me`;
    this._baseUrlCards = `${baseUrl}/cards`;
    this._headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    };
  }

  _checkRespondStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile() {
    debugger
    return fetch(this._baseUrlUser, {
      headers: this._headers,
    }).then((res) => this._checkRespondStatus(res));
  }

  editProfile(data) {
    return fetch(this._baseUrlUser, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkRespondStatus(res));
  }

  editAvatar(data) {
    return fetch(`${this._baseUrlUser}/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: data,
      }),
    }).then((res) => this._checkRespondStatus(res));
  }

  getInitialCards() {
    return fetch(this._baseUrlCards, {
      headers: this._headers,
    }).then((res) => this._checkRespondStatus(res));
  }

  addNewCard(data) {
    return fetch(this._baseUrlCards, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.place,
        link: data.link,
      }),
    }).then((res) => this._checkRespondStatus(res));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrlCards}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkRespondStatus(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrlCards}/${cardId}/likes/`, {
        method: "PUT",
        headers: this._headers,
        body: JSON.stringify(api.getProfile()),
      }).then((res) => this._checkRespondStatus(res));
    } else {
      return fetch(`${this._baseUrlCards}/${cardId}/likes/`, {
        method: "DELETE",
        headers: this._headers,
        body: JSON.stringify(api.getProfile().then((data) => data)),
      }).then((res) => this._checkRespondStatus(res));
    }
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    authorization:"",
    "Content-Type": "application/json",
  },
});

