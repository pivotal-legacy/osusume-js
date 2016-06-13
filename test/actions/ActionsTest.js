import expect from "expect"
import nock from "nock"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import * as actions from "../../src/js/actions/Actions"
import * as types from "../../src/js/constants/ActionTypes"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Actions", () => {
  afterEach(() => {
    nock.cleanAll()
    localStorage.clear()
    expect.restoreSpies()
  })

  it("creates the fetchSuggestions action", () => {
    localStorage.setItem('token', 'party')
    let suggestions = [
      {name: 'Afuri', address: 'Roppongi'}
    ]
    nock('http://localhost:8080', {
      headers: {
        'Authorization': 'Bearer party'
      },
      method: 'POST',
      body: {restaurantName: 'Afuri'}
    })
    .post('/restaurant_suggestions')
    .reply(200, suggestions)

    const expectedActions = [
      {type: types.FETCH_SUGGESTIONS_SUCCESS, suggestions: suggestions}
    ]
    const store = mockStore([])
    return store.dispatch(actions.fetchSuggestions('AFURI'))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("creates the fetchCuisineTypes action", () => {
    localStorage.setItem('token', 'party')
    let cuisineTypes = [
      {id: 0, name: 'Not Specified'},
      {id: 1, name: 'Japanese'},
      {id: 2, name: 'French'}
    ]
    nock('http://localhost:8080', {
      headers: {'Authorization': 'Bearer party'}
    })
    .get('/cuisines')
    .reply(200, cuisineTypes)

    const expectedActions = [
      {type: types.FETCH_CUISINE_TYPES_SUCCESS, cuisineTypes: cuisineTypes}
    ]
    const store = mockStore([])
    return store.dispatch(actions.fetchCuisineTypes())
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("creates the fetchPriceRanges action", () => {
    localStorage.setItem('token', 'party')
    let priceRanges = [
      {id: 0, range: 'Not Specified'},
      {id: 1, range: '¥0~999'},
      {id: 2, range: '¥1000~1999'}
    ]
    nock('http://localhost:8080', {
      headers: {'Authorization': 'Bearer party'}
    })
    .get('/priceranges')
    .reply(200, priceRanges)

    const expectedActions = [
      {type: types.FETCH_PRICE_RANGES_SUCCESS, priceRanges: priceRanges}
    ]
    const store = mockStore([])
    return store.dispatch(actions.fetchPriceRanges())
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("creates the fetchComments action", () => {
    localStorage.setItem('token', 'party')
    let comments = [
      {id: 0, comment: 'Not Specified', restaurant_id: 10},
      {id: 1, comment: 'This is second comment', restaurant_id: 10}
    ]
    nock('http://localhost:8080', {
      headers: {'Authorization': 'Bearer party'}
    })
    .get('/restaurants/10/comments')
    .reply(200, comments)

    const expectedActions = [
      {type: types.FETCH_COMMENTS_SUCCESS, comments: comments}
    ]
    const store = mockStore([])
    return store.dispatch(actions.fetchComments(10))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
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
    .reply(200, {token: 'party'})
    let hashHistory = {
      push: () => {}
    }
    const hashHandler = expect.spyOn(hashHistory, 'push')

    return store.dispatch(actions.login('danny@pivotal.io', 'password', hashHistory))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(localStorage.getItem('token')).toEqual('party')
        expect(hashHandler).toHaveBeenCalledWith('/')
      })
  })
})
