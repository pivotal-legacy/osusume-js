import * as types from '../constants/ActionTypes'
import {List, fromJS} from 'immutable'

export default function restaurants(state = List(), action) {
  switch (action.type) {
    case types.FETCH_RESTAURANTS_SUCCESS:
      return fromJS(action.restaurants)
    case types.FETCH_RESTAURANT_SUCCESS:
      return state.mergeDeep(fromJS([action.restaurant]))
    case types.CREATE_LIKE_SUCCESS:
      return state.update(
        state.findIndex(function(item) {
          return item.get('id') === action.restaurantId;
        }), function(item) {
          return item.set('num_likes', (item.get('num_likes') || 0) + 1).set('liked', true)
        }
      )
    case types.REMOVE_LIKE_SUCCESS:
      return state.update(
        state.findIndex(function(item) {
          return item.get('id') === action.restaurantId;
        }), function(item) {
          return item.set('num_likes', (item.get('num_likes') || 0) - 1).set('liked', false)
        }
      )
    default:
      return state
  }
}
