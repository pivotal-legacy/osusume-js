import expect from 'expect'
import {requireAuth} from '../src/js/Authentication'

describe('Authentication', () => {
  it('redirects if the store does not have a user', () => {
    let redirectTo = expect.createSpy()

    let store = {
      store:  {
        getState: () => {
          return {
            currentUser: {}
          }
        }
      }
    }
    let ourRequireAuth = requireAuth.bind(store)
    ourRequireAuth(null, redirectTo)

    expect(redirectTo).toHaveBeenCalledWith({pathname: '/login', state: {}})
  })

  it('does not redirect if the store has a user', () => {
    let redirectTo = expect.createSpy()

    let store = {
      store:  {
        getState: () => {
          return {currentUser: {token: 'party'}}
        }
      }
    }
    let ourRequireAuth = requireAuth.bind(store)
    ourRequireAuth(null, redirectTo)

    expect(redirectTo).toNotHaveBeenCalled()
  })
})
