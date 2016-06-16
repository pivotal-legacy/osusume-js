import expect from 'expect'

import * as currentUserReducer from '../../src/js/reducers/CurrentUserReducer'
import * as types from '../../src/js/constants/ActionTypes'

describe('CurrentUserReducer', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('returns the currentUser when the action is LOGIN_SUCCESS', () => {
    let user = {token: 'party', name: 'Danny', id: 17}
    let action = {
      type: types.LOGIN_SUCCESS,
      user: user
    }

    expect(currentUserReducer.currentUser(undefined, action)).toEqual(user)
  })

  it('delete the currentUser when the action is LOGOUT_SUCCESS', () => {
    localStorage.setItem('user', JSON.stringify({token: 'token'}))
    let action = {
      type: types.LOGOUT_SUCCESS
    }

    expect(currentUserReducer.currentUser(undefined, action)).toEqual(null)
  })
})
