class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
    this._toDate = new Date().toISOString();
    this._fromDate = new Date(
      new Date().getTime() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
  }

  getUserInformation(token) {
    return fetch(`${this._baseURL}/users/me`, {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  getInitialCards(token) {
    return fetch(`${this._baseURL}/cards`, {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  updateUserInformation(userInfo, token) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: JSON.stringify(userInfo),
    }).then(this._checkResponse);
  }

  addCard(cardData, token) {
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: JSON.stringify(cardData),
    }).then(this._checkResponse);
  }

  deleteCard(id, token) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      method: 'DELETE',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  _addLike(id, token) {
    return fetch(`${this._baseURL}/cards/${id}/likes`, {
      method: 'PUT',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  _removeLike(id, token) {
    return fetch(`${this._baseURL}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked, token) {
    return !isLiked ? this._addLike(id, token) : this._removeLike(id, token);
  }

  updateUserAvartar(userAvatar, token) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: JSON.stringify(userAvatar),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseURL: 'https://api.around-jl.students.nomoreparties.site',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
