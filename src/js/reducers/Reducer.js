import { combineReducers } from 'redux'

import restaurants from './RestaurantReducer'
import currentRestaurant from './CurrentRestaurantReducer'
import comments from './CommentReducer'
import currentUser from './CurrentUserReducer'
import suggestions from './SuggestionReducer'
import cuisineTypes from './CuisineTypeReducer'
import priceRanges from './PriceRangeReducer'

export default combineReducers({
  restaurants,
  currentRestaurant,
  comments,
  currentUser,
  suggestions,
  cuisineTypes,
  priceRanges
})