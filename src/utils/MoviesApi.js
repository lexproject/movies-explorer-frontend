import { apiBestFilms } from "./constants";

class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponseMovies(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return res.json();
      }
    }

    getMovies() {
      return fetch(`${this._baseUrl}/beatfilm-movies`, {
        headers: this._headers
      })
        .then(res => this._getResponseMovies(res));
    }

}

export const moviesApi = new MoviesApi({
    baseUrl: apiBestFilms,
    headers: {
        'Content-Type': 'application/json'
    }
});
