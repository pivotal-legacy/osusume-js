export function getToken() {
  return localStorage.getItem('token')
}

export function getUserName() {
  return localStorage.getItem('userName')
}

export function createSession(token, userName) {
  localStorage.setItem('token', token)
  localStorage.setItem('userName', userName)
}

export function deleteSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('userName')
}
