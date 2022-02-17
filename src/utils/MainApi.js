import checkResponse from './apiHelpers';
import { BASE_URL } from './constants';

export const registerUser = ({name, email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    'method': 'POST',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
    .then((res) => checkResponse(res))
    .then((data) => data);
}

export const loginUser = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    'method': 'POST',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => checkResponse(res))
    .then(data => data);
}

export class UserAPIRequests {
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
          Authorization: `Bearer: ${token}`
        }
      })
        .then((res) => checkResponse(res))
        .then((data) => data);
    }
}
