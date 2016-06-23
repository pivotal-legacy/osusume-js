import * as types from '../constants/ActionTypes';
import {fromJS, List} from 'immutable'

export function suggestions(suggestions = List(), action) {
  switch (action.type) {
    case types.FETCH_SUGGESTIONS_SUCCESS:
      return fromJS(action.suggestions)
    default:
      return suggestions
  }
}
