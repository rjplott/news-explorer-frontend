import checkResponse from './apiHelpers';
import { BASE_URL } from './constants';

class AritcleAPIRequests {

  setToken(token) {
    this.token = token;
  }

  create(article) {
    return fetch(`${BASE_URL}/articles/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify(article),
    })
      .then(res => checkResponse(res))
      .then(data => data);
  }

  delete(articleId) {
    return fetch(`${BASE_URL}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => checkResponse(res))
      .then((data) => data);
  }

  getSavedArticles() {
    return fetch(`${BASE_URL}/articles`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => checkResponse(res))
      .then((data) => data);
  }
}

class UserAPIRequests {
    login({ email, password }) {
      return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => checkResponse(res))
        .then((data) => data);
    }
  
    register({ name, email, password }) {
      return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((res) => checkResponse(res))
        .then((data) => data);
    }

    getInformation(token) {
      return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => checkResponse(res))
        .then((data) => data);
    }
}

export const userApi = new UserAPIRequests();
export const articleApi = new AritcleAPIRequests();