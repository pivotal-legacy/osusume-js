import {hashHistory} from 'react-router'
import {getToken} from '../Session'

export function requireAuth(nextState, replace) {
  if (!getToken()) {
    replace({pathname: '/login', state: {}});
  }
}
