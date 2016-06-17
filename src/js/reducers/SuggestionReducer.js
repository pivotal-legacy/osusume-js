import * as types from '../constants/ActionTypes';

export function suggestions(suggestions = [], action) {
  switch (action.type) {
    case types.FETCH_SUGGESTIONS_SUCCESS:
      return action.suggestions
    default:
      return suggestions
  }
}
