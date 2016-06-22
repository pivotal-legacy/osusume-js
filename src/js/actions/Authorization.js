export function authorizationConfig(currentUser) {
  return {
    headers: {
      'Authorization': `Bearer ${currentUser.get('token')}`,
      'Content-Type': 'application/json'
    }
  }
}
