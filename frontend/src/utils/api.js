import { options } from "./utils";

class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _checkApiRequest(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`${res.status}`));
  }

  getUserInfo(token) {
    return fetch(`${this.url}/users/me`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkApiRequest);
  }

  getInitialCards(token) {
    return fetch(`${this.url}/cards`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkApiRequest);
  }

  getInitialData(token) {
    return Promise.all([this.getUserInfo(token), this.getInitialCards(token)]);
  }

  setUserInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ name, about }),
    }).then(this._checkApiRequest);
  }

  changeAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ avatar }),
    }).then(this._checkApiRequest);
  }

  addCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ name, link }),
    }).then(this._checkApiRequest);
  }

  removeCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkApiRequest);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkApiRequest);
  }
}

const api = new Api(options);

export default api;
