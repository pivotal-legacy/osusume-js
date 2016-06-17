import {restaurants} from './RestaurantReducer'
import {comments} from './CommentReducer'
import {currentUser} from './CurrentUserReducer'
import {suggestions} from './SuggestionReducer'
import {cuisineTypes} from './CuisineTypeReducer'
import {priceRanges} from './PriceRangeReducer'

const reducer = (state={}, action) => {
  return {
    restaurants: restaurants(state.restaurants, action),
    comments: comments(state.comments, action),
    currentUser: currentUser(state.currentUser, action),
    suggestions: suggestions(state.suggestions, action),
    cuisineTypes: cuisineTypes(state.cuisineTypes, action),
    priceRanges: priceRanges(state.priceRanges, action)
  }
}

export default reducer
