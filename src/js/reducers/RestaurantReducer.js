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
    case types.CREATE_LIKE_SUCCESS:
      return state.map((restaurant) => {
        if(restaurant.id === action.restaurantId) {
          return Object.assign({}, restaurant,
            {num_likes: restaurant.num_likes + 1, liked: true})
        }
        return restaurant
      })
    case types.REMOVE_LIKE_SUCCESS:
      return state.map((restaurant) => {
        if(restaurant.id === action.restaurantId) {
          return Object.assign({}, restaurant,
            {num_likes: restaurant.num_likes - 1, liked: false})
        }
        return restaurant
      })
    default:
      return state
  }
}
