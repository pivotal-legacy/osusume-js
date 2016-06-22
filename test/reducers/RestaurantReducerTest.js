import expect from 'expect'
import {List, fromJS} from 'immutable'
import * as reducer from '../../src/js/reducers/RestaurantReducer'
import * as types from '../../src/js/constants/ActionTypes'

describe('RestaurantReducer', () => {
  it('returns the list of restaurants when the action is FETCH_RESTAURANTS_SUCCESS', () => {
    let restaurants = [
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Tsukemen'}
    ]
    let action = {
      type: types.FETCH_RESTAURANTS_SUCCESS,
      restaurants: restaurants
    }

    expect(reducer.restaurants(undefined, action)).toEqual(fromJS([
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Tsukemen'}
    ]))
  })

  it('returns a restaurant when the action is FETCH_RESTAURANT_SUCCESS', () => {
    let restaurant = {id: 0, name: 'Afuri', comments: ['i love it']}
    let action = {
      type: types.FETCH_RESTAURANT_SUCCESS,
      restaurant: restaurant
    }

    let state = fromJS([
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Pizzakaya'}
    ])

    expect(reducer.restaurants(state, action)).toEqual(fromJS([
      {id: 0, name: 'Afuri', comments: ['i love it']},
      {id: 1, name: 'Pizzakaya'}
    ]))
  })

  it('returns a restaurant when the action is FETCH_RESTAURANT_SUCCESS and there are no restaurants yet', () => {
    let restaurant = {id: 0, name: 'Afuri', comments: ['i love it']}
    let action = {
      type: types.FETCH_RESTAURANT_SUCCESS,
      restaurant: restaurant
    }

    expect(reducer.restaurants(undefined, action)).toEqual(fromJS([restaurant]))
  })

  it('returns all restaurants with the new restaurant at the head of the list when action is CREATE_RESTAURANT_SUCCESS', () => {
    let existingRestaurant = {name: "Butagumi", address: "Roppongi"}
    let newRestaurant = {name: "Afuri", address: "Roppongi"}
    let action = {
      type: types.CREATE_RESTAURANT_SUCCESS,
      restaurant: newRestaurant
    }

    let existingState = fromJS([existingRestaurant])

    expect(reducer.restaurants(existingState, action)).toEqual(fromJS([
      newRestaurant, existingRestaurant
    ]))
  })

  it('returns the restaurant with number of likes when the action is CREATE_LIKE_SUCCESS', () => {
    let restaurants = fromJS([
      {id: 1, comment: 'this is second comment', num_likes: 2, liked: false},
      {id: 2, comment: 'another one'}
    ])
    let action = {
      type: types.CREATE_LIKE_SUCCESS,
      restaurantId: 1
    }

    expect(reducer.restaurants(restaurants, action)).toEqual(fromJS([
      {id: 1, comment: 'this is second comment', num_likes: 3, liked: true},
      {id: 2, comment: 'another one'}
    ]))
  })

  it('returns the restaurant with number of likes when the action is REMOVE_LIKE_SUCCESS', () => {
    let restaurants = fromJS([
      {id: 1, comment: 'this is second comment', num_likes: 2, liked: true},
      {id: 2, comment: 'another one'}
    ])
    let action = {
      type: types.REMOVE_LIKE_SUCCESS,
      restaurantId: 1
    }
    let updatedRestaurants = fromJS([
      {id: 1, comment: 'this is second comment', num_likes: 1, liked: false},
      {id: 2, comment: 'another one'}
    ])

    expect(reducer.restaurants(restaurants, action)).toEqual(updatedRestaurants)
  })

  it('returns empty array by default', () => {
    expect(reducer.restaurants(undefined, {})).toEqual(fromJS([]))
  })
})
