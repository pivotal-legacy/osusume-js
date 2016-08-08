import * as types from '../constants/ActionTypes'

const INITIAL_STATE = []

export default function restaurants(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_RESTAURANTS_SUCCESS:
      return action.restaurants
    default:
      return state
  }
}
