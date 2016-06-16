import expect from 'expect'

import {updateLocalStorageWithUser} from '../../src/js/subscribers/LocalStorage'

describe('LocalStorage', () => {
  afterEach(() => {
    expect.restoreSpies()
    localStorage.clear()
  })

  it('sets the current user in local storage and redirects if the user does not exist in local storage', () => {
    let state = {
      currentUser: {
        token: 'token',
        id: 'id',
        name: 'name'
      }
    }
    expect(localStorage.getItem('user')).toEqual(null)

    let hashHistory = {push: () => {}}
    const hashHandler = expect.spyOn(hashHistory, 'push')

    updateLocalStorageWithUser(state, hashHistory)

    expect(JSON.parse(localStorage.getItem('user'))).toEqual(state.currentUser)
    expect(hashHandler).toHaveBeenCalledWith('/')
  })

  it('removes the user from local storage if the current user is null', () => {
    let localStorageUser = {
      token: 'token',
      id: 'id',
      name: 'name'
    }
    localStorage.setItem('user', JSON.stringify(localStorageUser))
    let hashHistory = {push: () => {}}
    const hashHandler = expect.spyOn(hashHistory, 'push')

    updateLocalStorageWithUser({currentUser: null}, hashHistory)

    expect(localStorage.getItem('user')).toEqual(null)
    expect(hashHandler).toHaveBeenCalledWith('/login')
    expect(hashHandler.calls.length).toEqual(1)
  })

  it('does not set the current user in local storage nor redirect if the user matches the one in the store', () => {
    let state = {
      currentUser: {
        token: 'token',
        id: 'id',
        name: 'name'
      }
    }
    localStorage.setItem('user', JSON.stringify(state.currentUser))
    let spy = expect.spyOn(localStorage, 'setItem')
    let hashHistory = {push: () => {}}
    const hashHandler = expect.spyOn(hashHistory, 'push')

    updateLocalStorageWithUser(state, hashHistory)

    expect(spy).toNotHaveBeenCalled()
    expect(hashHandler).toNotHaveBeenCalled()
  })
})
