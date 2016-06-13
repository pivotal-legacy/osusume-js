import * as types from '../constants/ActionTypes';
import * as restaurantReducer from './RestaurantReducer'
import * as commentReducer from './CommentReducer'

const initialState = {
  restaurants: [],
  suggestions: [],
  cuisineTypes: [],
  priceRanges: [],
  comments: []
}

const reducer = (state = initialState, action) => {
  if (action.type == undefined)
    return state

  switch (action.type) {
    case types.FETCH_RESTAURANTS_SUCCESS:
    case types.FETCH_RESTAURANT_SUCCESS:
    case types.CREATE_RESTAURANT_SUCCESS:
    case types.CREATE_LIKE_SUCCESS:
    case types.REMOVE_LIKE_SUCCESS:
      return Object.assign({}, state,
        {restaurants: restaurantReducer.restaurants(state.restaurants, action)})
    case types.FETCH_SUGGESTIONS_SUCCESS:
      return Object.assign({}, state,
        {suggestions: action.suggestions});
    case types.FETCH_CUISINE_TYPES_SUCCESS:
      return Object.assign({}, state,
        {cuisineTypes: action.cuisineTypes})
    case types.FETCH_PRICE_RANGES_SUCCESS:
      return Object.assign({}, state,
        {priceRanges: action.priceRanges})
    case types.FETCH_COMMENTS_SUCCESS:
    case types.CREATE_COMMENT_SUCCESS:
      return Object.assign({}, state,
        {comments: commentReducer.comments(state.comments, action)})
    default:
      return state
  }
}

export default reducer
