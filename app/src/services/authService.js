import http from './httpService'
import jwtDecode from 'jwt-decode'

const tokenKey = 'token'

http.setJwt(getJwt())

export async function login(email, password) {

  const result = await http.post(`http://localhost:30000/api/users/login`, { email, password })
  localStorage.setItem(tokenKey, result.data.token)
  return result
}

export async function confirmLogin(email, token) {
  const result = await http.post(`http://localhost:30000/api/users/confirm-login`, { email, token })
  localStorage.setItem(tokenKey, result.data.token)
  return result
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt)
}

export async function getUserByEmail(email) {
  const result = await http.get(`http://localhost:30000/api/users/${email}`)
  return result
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey)
    const user = jwtDecode(jwt)
    return user
  } catch (error) {
    return null
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey)
}

export default {
  login,
  loginWithJwt,
  getCurrentUser,
  getJwt,
  confirmLogin,
  getUserByEmail
}