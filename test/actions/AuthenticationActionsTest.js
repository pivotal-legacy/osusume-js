import expect from "expect"
import nock from "nock"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import * as actions from "../../src/js/actions/AuthenticationActions"
import * as types from "../../src/js/constants/ActionTypes"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("AuthenticationActions", () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it("logs the user in", () => {
    const store = mockStore([])
    let user = {token: 'party', name: 'Danny', id: 17}
    nock('http://localhost:8080')
    .post('/session', {
      email: 'danny@pivotal.io',
      password: 'password'
    })
    .reply(200, user)

    const expectedActions = [
      {type: types.LOGIN_SUCCESS, user: user}
    ]

    return store.dispatch(actions.login('danny@pivotal.io', 'password'))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("logs the user out", () => {
    const store = mockStore({currentUser: {token: 'party'}})
    nock('http://localhost:8080')
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .delete('/session', {token: 'party'})
    .reply(200, {})

    const expectedActions = [
      {type: types.LOGOUT_SUCCESS}
    ]

    return store.dispatch(actions.logout())
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
