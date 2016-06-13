import expect from 'expect'
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

    expect(reducer.restaurants(undefined, action)).toEqual(
      [
        {id: 0, name: 'Afuri'},
        {id: 1, name: 'Tsukemen'}
      ]
    )
  })

  it('returns a restaurant when the action is FETCH_RESTAURANT_SUCCESS', () => {
    let restaurant = {id: 0, name: 'Afuri', comments: ['i love it']}
    let action = {
      type: types.FETCH_RESTAURANT_SUCCESS,
      restaurant: restaurant
    }

    let state = [
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Pizzakaya'}
    ]
    expect(reducer.restaurants(state, action)).toEqual([
      {id: 0, name: 'Afuri', comments: ['i love it']},
      {id: 1, name: 'Pizzakaya'}
    ])
  })

  it('returns a restaurant when the action is FETCH_RESTAURANT_SUCCESS and there are no restaurants yet', () => {
    let restaurant = {id: 0, name: 'Afuri', comments: ['i love it']}
    let action = {
      type: types.FETCH_RESTAURANT_SUCCESS,
      restaurant: restaurant
    }

    expect(reducer.restaurants(undefined, action)).toEqual([restaurant])
  })

  it('returns all restaurants with the new restaurant at the head of the list when action is CREATE_RESTAURANT_SUCCESS', () => {
    let existingRestaurant = {name: "Butagumi", address: "Roppongi"}
    let newRestaurant = {name: "Afuri", address: "Roppongi"}
    let action = {
      type: types.CREATE_RESTAURANT_SUCCESS,
      restaurant: newRestaurant
    }

    let existingState = [existingRestaurant]

    expect(reducer.restaurants(existingState, action)).toEqual([newRestaurant, existingRestaurant])
  })

  it('returns the restaurant with number of likes when the action is CREATE_LIKE_SUCCESS', () => {
    let restaurants = [
      {id: 1, comment: 'this is second comment', num_likes: 2}
    ]
    let action = {
      type: types.CREATE_LIKE_SUCCESS,
      restaurantId: 1
    }
    let updatedRestaurants = [
      {id: 1, comment: 'this is second comment', num_likes: 3}
    ]

    expect(reducer.restaurants(restaurants, action)).toEqual(updatedRestaurants)
  })
})
