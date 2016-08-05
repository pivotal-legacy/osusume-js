import * as types from '../constants/ActionTypes'

const INITIAL_STATE = []

export default function priceRanges(priceRanges = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_PRICE_RANGES_SUCCESS:
      return action.priceRanges
    default:
      return priceRanges
  }
}
