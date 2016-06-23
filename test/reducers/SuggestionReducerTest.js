import expect from 'expect'
import {fromJS} from 'immutable'
import * as suggestionReducer from '../../src/js/reducers/SuggestionReducer'
import * as types from '../../src/js/constants/ActionTypes';

describe('SuggestionReducer', () => {
  it('returns the list of suggestions when the action is FETCH_SUGGESTIONS_SUCCESS', () => {
    let suggestions  = [
      {name: 'Afuri', address: 'Roppongi'},
      {name: 'Singaporean Chicken', address: 'Roppongi'}
    ]
    let action = {
      type: types.FETCH_SUGGESTIONS_SUCCESS,
      suggestions: suggestions
    }

    expect(suggestionReducer.suggestions(undefined, action)).toEqual(fromJS(suggestions))
  })

  it('returns empty array by default', () => {
    expect(suggestionReducer.suggestions(undefined, {})).toEqual(fromJS([]))
  })
})
