import expect from "expect"
import nock from "nock"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import * as actions from "../../src/js/actions/AuthenticationActions"
import {getToken, getUserName, getUserId} from "../../src/js/Session"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("AuthenticationActions", () => {
  afterEach(() => {
    nock.cleanAll()
    localStorage.clear()
  })

  it("logs the user in", () => {
    const store = mockStore([])
    nock('http://localhost:8080', {
      method: 'POST',
      body: {
        email: 'danny@pivotal.io',
        password: 'password'
      }
    })
    .post('/session')
    .reply(200, {token: 'party', name: 'Danny', id: 17})
    let hashHistory = {
      push: () => {}
    }
    const hashHandler = expect.spyOn(hashHistory, 'push')

    return store.dispatch(actions.login('danny@pivotal.io', 'password', hashHistory))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(getToken()).toEqual('party')
        expect(getUserName()).toEqual('Danny')
        expect(getUserId()).toEqual(17)
        expect(hashHandler).toHaveBeenCalledWith('/')
      })
  })

  it("logs the user out", () => {
    localStorage.setItem('token', 'party')
    localStorage.setItem('userName', 'Danny')
    localStorage.setItem('userId', 17)
    const store = mockStore([])
    nock('http://localhost:8080', {
      method: 'DELETE',
      body: {
        token: 'party'
      }
    })
    .delete('/session')
    .reply(200, {})

    let hashHistory = {
      push: () => {}
    }
    const hashHandler = expect.spyOn(hashHistory, 'push')

    return store.dispatch(actions.logout(hashHistory))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(getToken()).toEqual(undefined)
        expect(getUserName()).toEqual(undefined)
        expect(getUserId()).toEqual(undefined)
        expect(hashHandler).toHaveBeenCalledWith('/login')
      })
  })
})
