import expect from 'expect'
import cuisineTypeReducer from '../../src/js/reducers/CuisineTypeReducer'
import * as types from '../../src/js/constants/ActionTypes'

describe('CuisineTypeReducer', () => {
  it('returns the cuisine types when the action is FETCH_CUISINE_TYPES_SUCCESS', () => {
    let cuisineTypes = [
      {id: 0, name: 'Not Specified'},
      {id: 1, name: 'Japanese'},
      {id: 2, name: 'French'}
    ]
    let action = {
      type: types.FETCH_CUISINE_TYPES_SUCCESS,
      cuisineTypes: cuisineTypes
    }

    expect(cuisineTypeReducer(undefined, action)).toEqual(cuisineTypes)
  })

  it('returns empty array by default', () => {
    expect(cuisineTypeReducer(undefined, {})).toEqual([])
  })
})
