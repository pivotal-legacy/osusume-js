import {hashHistory} from 'react-router'

export function requireAuth(nextState, replace) {
    if (!localStorage.getItem('token')) {
      replace({pathname: '/login', state: {}});
    }
  }
