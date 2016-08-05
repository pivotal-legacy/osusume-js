import * as types from '../constants/ActionTypes';

export default function currentUser(
  state = JSON.parse(localStorage.getItem('user')) || {},
  action
) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.user
    case types.LOGOUT_SUCCESS:
      return null
    default:
      return state
  }
}
