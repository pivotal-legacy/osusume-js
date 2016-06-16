import expect from "expect"
import nock from "nock"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import * as actions from "../../src/js/actions/Actions"
import * as types from "../../src/js/constants/ActionTypes"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Actions", () => {
  let store
  beforeEach(() => {
    store = mockStore({currentUser: {token: 'party'}})
  })
  afterEach(() => {
    nock.cleanAll()
    expect.restoreSpies()
  })

  it("creates the fetchSuggestions action", () => {
    let suggestions = [
      {name: 'Afuri', address: 'Roppongi'}
    ]
    nock('http://localhost:8080')
    .post('/restaurant_suggestions', {restaurantName: 'AFURI'})
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .reply(200, suggestions)

    const expectedActions = [
      {type: types.FETCH_SUGGESTIONS_SUCCESS, suggestions: suggestions}
    ]
    return store.dispatch(actions.fetchSuggestions('AFURI'))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("creates the fetchCuisineTypes action", () => {
    let cuisineTypes = [
      {id: 0, name: 'Not Specified'},
      {id: 1, name: 'Japanese'},
      {id: 2, name: 'French'}
    ]
    nock('http://localhost:8080')
    .get('/cuisines')
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .reply(200, cuisineTypes)

    const expectedActions = [
      {type: types.FETCH_CUISINE_TYPES_SUCCESS, cuisineTypes: cuisineTypes}
    ]
    return store.dispatch(actions.fetchCuisineTypes())
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("creates the fetchPriceRanges action", () => {
    let priceRanges = [
      {id: 0, range: 'Not Specified'},
      {id: 1, range: '¥0~999'},
      {id: 2, range: '¥1000~1999'}
    ]
    nock('http://localhost:8080')
    .get('/priceranges')
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .reply(200, priceRanges)

    const expectedActions = [
      {type: types.FETCH_PRICE_RANGES_SUCCESS, priceRanges: priceRanges}
    ]
    return store.dispatch(actions.fetchPriceRanges())
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("creates the fetchComments action", () => {
    let comments = [
      {id: 0, comment: 'Not Specified', restaurant_id: 10},
      {id: 1, comment: 'This is second comment', restaurant_id: 10}
    ]
    nock('http://localhost:8080')
    .get('/restaurants/10/comments')
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .reply(200, comments)

    const expectedActions = [
      {type: types.FETCH_COMMENTS_SUCCESS, comments: comments}
    ]
    return store.dispatch(actions.fetchComments(10))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
