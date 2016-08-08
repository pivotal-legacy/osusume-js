import expect from 'expect'
import currentRestaurant from '../../src/js/reducers/CurrentRestaurantReducer'
import * as types from '../../src/js/constants/ActionTypes'

describe('CurrentRestaurantReducer', () => {
  it('returns a restaurant when the action is FETCH_RESTAURANT_SUCCESS', () => {
    let restaurant = {id: 0, name: 'Afuri', comments: ['i love it']}
    let action = {
      type: types.FETCH_RESTAURANT_SUCCESS,
      restaurant: restaurant
    }

    expect(currentRestaurant({}, action)).toEqual(
      {id: 0, name: 'Afuri', comments: ['i love it']}
    )
  })

  it('returns empty object by default', () => {
    expect(currentRestaurant(undefined, {})).toEqual({})
  })

  it('returns the restaurant with number of likes when the action is CREATE_LIKE_SUCCESS', () => {
    let currentState = {id: 1, num_likes: 2, liked: false}
    let action = {
      type: types.CREATE_LIKE_SUCCESS,
      restaurantId: 1
    }

    expect(currentRestaurant(currentState, action)).toEqual(
      {id: 1, num_likes: 3, liked: true}
    )
  })

  it('returns the restaurant with number of likes when the action is REMOVE_LIKE_SUCCESS', () => {
    let currentState = {id: 1, num_likes: 2, liked: true}
    let action = {
      type: types.REMOVE_LIKE_SUCCESS,
      restaurantId: 1
    }
    let updatedRestaurant = {id: 1, num_likes: 1, liked: false}

    expect(currentRestaurant(currentState, action)).toEqual(updatedRestaurant)
  })
})