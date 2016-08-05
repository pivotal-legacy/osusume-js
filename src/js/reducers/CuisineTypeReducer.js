import * as types from '../constants/ActionTypes'

const INITIAL_STATE = []

export default function cuisineTypes(cuisineTypes = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_CUISINE_TYPES_SUCCESS:
      return action.cuisineTypes
    default:
      return cuisineTypes
  }
}
