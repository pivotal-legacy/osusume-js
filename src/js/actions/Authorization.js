import { getToken } from '../Session'

export function authorizationConfig() {
  return {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  }
}
