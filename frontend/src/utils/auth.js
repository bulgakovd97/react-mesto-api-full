import { authOptions } from "./utils";

class Auth {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  register({ password, email }) {
    return fetch(`${this.url}/signup`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  authorize({ password, email }) {
    return fetch(`${this.url}/signin`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  getContent(token) {
    return fetch(`${this.url}/users/me`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

export const auth = new Auth(authOptions);
