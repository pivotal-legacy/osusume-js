import * as types from '../constants/ActionTypes';

const INITIAL_STATE = []

export default function suggestions(suggestions = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_SUGGESTIONS_SUCCESS:
      return action.suggestions
    default:
      return suggestions
  }
}
