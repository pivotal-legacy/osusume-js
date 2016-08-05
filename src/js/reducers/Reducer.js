import { combineReducers } from 'redux'

import restaurants from './RestaurantReducer'
import comments from './CommentReducer'
import currentUser from './CurrentUserReducer'
import suggestions from './SuggestionReducer'
import cuisineTypes from './CuisineTypeReducer'
import priceRanges from './PriceRangeReducer'

export default combineReducers({
  restaurants,
  comments,
  currentUser,
  suggestions,
  cuisineTypes,
  priceRanges
})