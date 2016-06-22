import * as types from '../constants/ActionTypes'
import {List, Map, fromJS} from 'immutable'

export function restaurants(state = List(), action) {
  switch (action.type) {
    case types.FETCH_RESTAURANTS_SUCCESS:
      return fromJS(action.restaurants)
    case types.FETCH_RESTAURANT_SUCCESS:
      return state.mergeDeep(fromJS([action.restaurant]))
    case types.CREATE_RESTAURANT_SUCCESS:
      return state.insert(0, fromJS(action.restaurant))
    case types.CREATE_LIKE_SUCCESS:
      let likedRestaurant = fromJS([{
        id: action.restaurantId,
        num_likes: 'previous value needs to be incremented when merging',
        liked: true
      }])
      return state.mergeDeepWith(likedMerger, likedRestaurant)
    case types.REMOVE_LIKE_SUCCESS:
      let dislikedRestaurant = fromJS([{
        id: action.restaurantId,
        num_likes: 'previous value needs to be decremented when merging',
        liked: false
      }])
      return state.mergeDeepWith(dislikedMerger, dislikedRestaurant)
    default:
      return state
  }
}

function likedMerger(prev, next, key) {
  return key == 'num_likes' ? prev + 1 : next
}

function dislikedMerger(prev, next, key) {
  return key == 'num_likes' ? prev - 1 : next
}
