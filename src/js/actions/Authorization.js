export function authorizationConfig(currentUser) {
  return {
    headers: {
      'Authorization': `Bearer ${currentUser.token}`,
      'Content-Type': 'application/json'
    }
  }
}
