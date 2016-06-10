import * as types from '../constants/ActionTypes';

export function restaurants(state = [], action) {
  switch (action.type) {
    case types.FETCH_RESTAURANTS_SUCCESS:
      return action.restaurants
    case types.FETCH_RESTAURANT_SUCCESS:
      if (state.length < 1) {
        return [action.restaurant]
      }
      return state.map((restaurant) => {
        if(restaurant.id === action.restaurant.id) {
          return Object.assign({}, restaurant, action.restaurant)
        }
        return restaurant
      })
    case types.CREATE_RESTAURANT_SUCCESS:
      return [
        action.restaurant,
        ...state
      ]
    default:
      return state
  }
}
