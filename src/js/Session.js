export function getToken() {
  return localStorage.getItem('token')
}

export function getUserName() {
  return localStorage.getItem('userName')
}

export function getUserId() {
  return localStorage.getItem('userId')
}

export function createSession(token, userName, userId) {
  localStorage.setItem('token', token)
  localStorage.setItem('userName', userName)
  localStorage.setItem('userId', userId)
}

export function deleteSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  localStorage.removeItem('userId')
}
