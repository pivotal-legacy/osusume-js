import expect from 'expect'

import reducer from '../../src/js/reducers/Reducer'
import * as restaurantReducer from '../../src/js/reducers/RestaurantReducer'
import * as commentReducer from '../../src/js/reducers/CommentReducer'
import * as currentUserReducer from '../../src/js/reducers/CurrentUserReducer'
import * as suggestionReducer from '../../src/js/reducers/SuggestionReducer'
import * as cuisineTypeReducer from '../../src/js/reducers/CuisineTypeReducer'
import * as priceRangeReducer from '../../src/js/reducers/PriceRangeReducer'

describe('Reducer', () => {
  afterEach(function () {
    expect.restoreSpies()
  })

  it('returns the combined states of each individual reducer', () => {
    let restaurantReducerSpy = expect.spyOn(restaurantReducer, 'restaurants').andReturn('restaurants')
    let commentReducerSpy = expect.spyOn(commentReducer, 'comments').andReturn('comments')
    let currentUserReducerSpy = expect.spyOn(currentUserReducer, 'currentUser').andReturn('currentUser')
    let suggestionReducerSpy = expect.spyOn(suggestionReducer, 'suggestions').andReturn('suggestions')
    let cuisineTypeReducerSpy = expect.spyOn(cuisineTypeReducer, 'cuisineTypes').andReturn('cuisineTypes')
    let priceRangeReducerSpy = expect.spyOn(priceRangeReducer, 'priceRanges').andReturn('priceRanges')

    expect(
      reducer(undefined, {})
    ).toEqual({
      restaurants: 'restaurants',
      suggestions: 'suggestions',
      cuisineTypes: 'cuisineTypes',
      priceRanges: 'priceRanges',
      comments: 'comments',
      currentUser: 'currentUser'
    })
    expect(restaurantReducerSpy).toHaveBeenCalledWith(undefined, {})
    expect(commentReducerSpy).toHaveBeenCalledWith(undefined, {})
    expect(currentUserReducerSpy).toHaveBeenCalledWith(undefined, {})
    expect(suggestionReducerSpy).toHaveBeenCalledWith(undefined, {})
    expect(cuisineTypeReducerSpy).toHaveBeenCalledWith(undefined, {})
    expect(priceRangeReducerSpy).toHaveBeenCalledWith(undefined, {})
  })
})
