import * as types from '../constants/ActionTypes'
import {List, fromJS} from 'immutable'

export default function restaurants(state = List(), action) {
  switch (action.type) {
    case types.FETCH_RESTAURANTS_SUCCESS:
      return fromJS(action.restaurants)
    default:
      return state
  }
}
