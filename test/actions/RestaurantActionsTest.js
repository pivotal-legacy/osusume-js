import expect from "expect"
import nock from "nock"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import * as actions from "../../src/js/actions/RestaurantActions"
import * as types from "../../src/js/constants/ActionTypes"
import S3FileUploader from "../../src/js/S3FileUploader"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe("RestaurantActions", () => {
  afterEach(() => {
    nock.cleanAll()
    localStorage.clear()
    expect.restoreSpies()
  })
  it("creates the fetchRestaurants action", () => {
    localStorage.setItem('token', 'party')
    let restaurants = [
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Tsukemen'}
    ]
    nock('http://localhost:8080', {
      headers: {
        'Authorization': 'Bearer party'
      }
    })
    .get('/restaurants')
    .reply(200, restaurants)

    const expectedActions = [
      {type: types.FETCH_RESTAURANTS_SUCCESS, restaurants: restaurants}
    ]
    const store = mockStore([])

    return store.dispatch(actions.fetchRestaurants())
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("creates the fetchRestaurant action", () => {
    localStorage.setItem('token', 'party')
    let restaurant = {id: 17, name: 'Afuri'}
    nock('http://localhost:8080', {
      headers: {
        'Authorization': 'Bearer party'
      }
    })
    .get('/restaurants/17')
    .reply(200, restaurant)

    const expectedActions = [
      {type: types.FETCH_RESTAURANT_SUCCESS, restaurant: restaurant}
    ]
    const store = mockStore([])

    return store.dispatch(actions.fetchRestaurant(17))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("uploads a photo and saves new restaurant to server", () => {
    localStorage.setItem('token', 'party')

    nock('http://localhost:8080', {
      headers: {
        'Authorization': 'Bearer party'
      }
    })
    .post('/restaurants', {restaurant: {
      name: 'Afuri',
      address: 'Roppongi',
      cuisineId: 0,
      priceRangeId: 1,
      notes: 'notes',
      photo_urls: [{url: 'http://its.a.party!!'}]
    }})
    .reply(200, {})

    const store = mockStore([])

    let expectedUrl = 'http://its.a.party!!'
    let promise = Promise.resolve(expectedUrl)
    promise.then((expectedUrl) => {
      expect(expectedUrl).toBe(url)
    })

    let s3FileUploader = new S3FileUploader()
    expect.spyOn(s3FileUploader, 'upload').andReturn(promise)

    let file = {name: "myfile.txt"}
    let restaurantParam = {name: 'Afuri', address: 'Roppongi', cuisineId: 0, priceRangeId: 1, notes: 'notes'}
    return store.dispatch(actions.addNewRestaurant(restaurantParam, file, s3FileUploader))
      .then(() => {
        expect(s3FileUploader.upload).toHaveBeenCalledWith(file)
        expect(nock.isDone()).toEqual(true)
      })
  })

  it("just saves the restaurant when no photo is specified", () => {
    localStorage.setItem('token', 'party')
    let restaurant = {name: "Afuri", address: "Roppongi"}
    nock('http://localhost:8080', {
      headers: {
        'Authorization': 'Bearer party'
      }
    })
    .post('/restaurants', {restaurant: {
      name: 'Afuri',
      address: 'Roppongi',
      cuisineId: 0,
      priceRangeId: 1,
      notes: 'notes',
      photo_urls: []
    }})
    .reply(200, restaurant)

    let s3FileUploader = new S3FileUploader()
    expect.spyOn(s3FileUploader, 'upload')
    const store = mockStore([])
    const expectedActions = [
      {type: types.CREATE_RESTAURANT_SUCCESS, restaurant: restaurant}
    ]

    let restaurantParam = {name: 'Afuri', address: 'Roppongi', cuisineId: 0, priceRangeId: 1, notes: 'notes'}
    return store.dispatch(actions.addNewRestaurant(restaurantParam, undefined, s3FileUploader))
      .then(() => {
        expect(s3FileUploader.upload).toNotHaveBeenCalled()
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("creates a comment", () => {
    localStorage.setItem('token', 'party')
    let comment = {
      content: 'it is a comment',
      created_at: 'date',
      restaurant_id: 1,
      user: {}
    }
    nock('http://localhost:8080', {
      headers: {
        'Authorization': 'Bearer party'
      }
    })
    .post('/restaurants/1/comments', {comment: 'it is a comment'})
    .reply(200, comment)

    const store = mockStore([])
    const expectedActions = [
      {type: types.CREATE_COMMENT_SUCCESS, comment: comment}
    ]

    return store.dispatch(actions.createComment(1, 'it is a comment'))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
