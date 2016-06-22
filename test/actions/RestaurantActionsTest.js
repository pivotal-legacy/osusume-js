import expect from "expect"
import nock from "nock"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import {fromJS} from 'immutable'
import * as actions from "../../src/js/actions/RestaurantActions"
import * as types from "../../src/js/constants/ActionTypes"
import S3FileUploader from "../../src/js/S3FileUploader"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe("RestaurantActions", () => {
  let store
  beforeEach(() => {
    store = mockStore({currentUser: fromJS({token: 'party'})})
  })
  afterEach(() => {
    nock.cleanAll()
    expect.restoreSpies()
  })
  it("creates the fetchRestaurants action", () => {
    let restaurants = [
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Tsukemen'}
    ]
    nock('http://localhost:8080')
    .get('/restaurants')
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .reply(200, restaurants)

    const expectedActions = [
      {type: types.FETCH_RESTAURANTS_SUCCESS, restaurants: restaurants}
    ]

    return store.dispatch(actions.fetchRestaurants())
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("creates the fetchRestaurant action", () => {
    let restaurant = {id: 17, name: 'Afuri'}
    nock('http://localhost:8080')
    .get('/restaurants/17')
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .reply(200, restaurant)

    const expectedActions = [
      {type: types.FETCH_RESTAURANT_SUCCESS, restaurant: restaurant}
    ]

    return store.dispatch(actions.fetchRestaurant(17))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("uploads a photo and saves new restaurant to server", () => {
    nock('http://localhost:8080')
    .post('/restaurants', {restaurant: {
      name: 'Afuri',
      address: 'Roppongi',
      cuisineId: 0,
      priceRangeId: 1,
      notes: 'notes',
      photo_urls: [{url: 'http://its.a.party!!'}]
    }})
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .reply(200, {})

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
    let restaurant = {name: "Afuri", address: "Roppongi"}
    nock('http://localhost:8080')
    .post('/restaurants', {restaurant: {
      name: 'Afuri',
      address: 'Roppongi',
      cuisineId: 0,
      priceRangeId: 1,
      notes: 'notes',
      photo_urls: []
    }})
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .reply(200, restaurant)

    let s3FileUploader = new S3FileUploader()
    expect.spyOn(s3FileUploader, 'upload')
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

  it("like", () => {
    nock('http://localhost:8080')
    .post('/restaurants/1/likes')
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .reply(200, {restaurantId: 1})

    const expectedActions = [
      {type: types.CREATE_LIKE_SUCCESS, restaurantId: 1}
    ]

    return store.dispatch(actions.like(1))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it("removeLike", () => {
    nock('http://localhost:8080')
    .delete('/restaurants/1/likes')
    .matchHeader('Authorization', (val) => val == 'Bearer party')
    .reply(200, {})

    const expectedActions = [
      {type: types.REMOVE_LIKE_SUCCESS, restaurantId: 1}
    ]

    return store.dispatch(actions.removeLike('1'))
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
