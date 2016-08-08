import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {}

export default function currentRestaurant(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_RESTAURANT_SUCCESS:
      return action.restaurant
    case types.CREATE_LIKE_SUCCESS:
      return Object.assign({}, state, {
        num_likes: state.num_likes + 1,
        liked: true
      })
    case types.REMOVE_LIKE_SUCCESS:
      return Object.assign({}, state, {
        num_likes: state.num_likes - 1,
        liked: false
      })
    default:
      return state
  }
}