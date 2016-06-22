import * as types from '../constants/ActionTypes'
import {fromJS, List} from 'immutable'

export function priceRanges(priceRanges = List(), action) {
  switch (action.type) {
    case types.FETCH_PRICE_RANGES_SUCCESS:
      return fromJS(action.priceRanges)
    default:
      return priceRanges
  }
}
