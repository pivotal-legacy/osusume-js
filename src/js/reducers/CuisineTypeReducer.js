import * as types from '../constants/ActionTypes';

export function cuisineTypes(cuisineTypes = [], action) {
  switch (action.type) {
    case types.FETCH_CUISINE_TYPES_SUCCESS:
      return action.cuisineTypes
    default:
      return cuisineTypes
  }
}
