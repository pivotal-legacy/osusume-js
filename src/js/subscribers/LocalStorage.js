import {hashHistory} from 'react-router'

export function updateLocalStorageWithUser(state, hashHistoryParam = hashHistory) {
  if (state.currentUser == null) {
    localStorage.removeItem('user')
    hashHistoryParam.push('/login')
  } else if (localStorage.getItem('user') == null) {
    localStorage.setItem('user', JSON.stringify(state.currentUser.toJS()))
    hashHistoryParam.push('/')
  }
}
