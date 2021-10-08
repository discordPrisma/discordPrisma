import { authHeader } from '../helper/auth-header'

export const userService = {
  login,
  logout,
  getAll
}
const apiURL = 'http://localhost:9090'

function login (password) {
  return fetch(`${apiURL}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })
    .then(handleResponse)
    .then(x => {
      localStorage.setItem('user', window.btoa(password))
      return x
    })
}

function logout () {
  localStorage.removeItem('user')
}

function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${apiURL}/users`, requestOptions).then(handleResponse)
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        logout()
        location.reload(true)
      }
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}
