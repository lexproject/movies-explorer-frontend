class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseApi(res) {
    if (!res.ok) {
      return res.text().then(text => { throw Error(text) });
    } else {
      return res.json();
    }
  }

  signup(password, email, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ password, email, name })
    })
      .then(res => this._getResponseApi(res));
  }

  signin(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then(res => this._getResponseApi(res));
  };

  getOut = () => {
    return fetch(`${this._baseUrl}/signout`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._getResponseApi(res));
  }

  getUserMe() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._getResponseApi(res));
  }

  updateUserMe(dataFormProfile) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(dataFormProfile)
    })
      .then(res => this._getResponseApi(res));
  }

  getUserMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._getResponseApi(res));
  }

  setNewMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(movieData)
    })
      .then(res => this._getResponseApi(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._getResponseApi(res));
  }

}

export const mainApi = new MainApi({
  baseUrl: 'https://api.movies.lex.nomoredomains.icu',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});