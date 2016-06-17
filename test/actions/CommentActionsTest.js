import expect from "expect"
import nock from "nock"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import * as actions from "../../src/js/actions/CommentActions"
import * as types from "../../src/js/constants/ActionTypes"
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("RestaurantActions", () => {
  let store
  beforeEach(() => {
    store = mockStore({currentUser: {token: 'party'}})
  })
  afterEach(() => {
    nock.cleanAll()
    expect.restoreSpies()
  })

  it("creates a comment", () => {
    let comment = {
      content: 'it is a comment',
      created_at: 'date',
      restaurant_id: 1,
      user: {}
    }
    nock('http://localhost:8080')
    .post('/restaurants/1/comments', {comment: 'it is a comment'})
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .reply(200, comment)

    const expectedActions = [
      {type: types.CREATE_COMMENT_SUCCESS, comment: comment}
    ]

    return store.dispatch(actions.createComment(1, 'it is a comment'))
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
