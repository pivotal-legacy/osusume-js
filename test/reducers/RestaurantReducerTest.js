import expect from 'expect'
import {fromJS} from 'immutable'
import restaurants from '../../src/js/reducers/RestaurantReducer'
import * as types from '../../src/js/constants/ActionTypes'

describe('RestaurantReducer', () => {
  it('returns the list of restaurants when the action is FETCH_RESTAURANTS_SUCCESS', () => {
    let returnedRestaurants = [
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Tsukemen'}
    ]
    let action = {
      type: types.FETCH_RESTAURANTS_SUCCESS,
      restaurants: returnedRestaurants
    }

    expect(restaurants(undefined, action)).toEqual(fromJS([
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Tsukemen'}
    ]))
  })

  it('returns empty array by default', () => {
    expect(restaurants(undefined, {})).toEqual(fromJS([]))
  })
})
