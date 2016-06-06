import * as types from './constants/ActionTypes';

const reducer = (state, action) => {
  if (state == undefined) {
    state = {
      restaurants: [],
      suggestions: [],
      cuisineTypes: [],
      priceRanges: []
    }
  }
  switch (action.type) {
    case types.FETCH_RESTAURANTS_SUCCESS:
      return Object.assign({}, state,
          {restaurants: action.restaurants});
    case types.FETCH_SUGGESTIONS_SUCCESS:
      return Object.assign({}, state,
        {suggestions: action.suggestions});
    case types.FETCH_CUISINE_TYPES_SUCCESS:
      return Object.assign({}, state,
        {cuisineTypes: action.cuisineTypes})
    case types.FETCH_PRICE_RANGES_SUCCESS:
      return Object.assign({}, state,
        {priceRanges: action.priceRanges})
    case types.CREATE_RESTAURANT_SUCCESS:
      return Object.assign({}, state,
        {
          restaurants: [
            action.restaurant,
            ...state.restaurants
          ]
        }
      )
    default:
      return state
  }
}

export default reducer
