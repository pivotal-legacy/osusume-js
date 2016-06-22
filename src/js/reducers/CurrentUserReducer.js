import * as types from '../constants/ActionTypes';
import {List, fromJS} from 'immutable'

export function currentUser(state, action) {
  if (state == undefined) {
    state = fromJS(JSON.parse(localStorage.getItem('user')))
  }
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return fromJS({token: action.user.token, name: action.user.name, id: action.user.id})
    case types.LOGOUT_SUCCESS:
      return null
    default:
      return state
  }
}
