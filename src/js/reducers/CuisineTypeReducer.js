import * as types from '../constants/ActionTypes'
import {List, fromJS} from 'immutable'

export function cuisineTypes(cuisineTypes = List(), action) {
  switch (action.type) {
    case types.FETCH_CUISINE_TYPES_SUCCESS:
      return fromJS(action.cuisineTypes)
    default:
      return cuisineTypes
  }
}
