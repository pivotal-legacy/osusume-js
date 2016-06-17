import * as types from '../constants/ActionTypes';

export function priceRanges(priceRanges = [], action) {
  switch (action.type) {
    case types.FETCH_PRICE_RANGES_SUCCESS:
      return action.priceRanges
    default:
      return priceRanges
  }
}
