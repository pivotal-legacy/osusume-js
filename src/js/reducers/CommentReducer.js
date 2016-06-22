import * as types from '../constants/ActionTypes'
import {List, fromJS} from 'immutable'

export function comments(state = List(), action) {
  switch (action.type) {
    case types.FETCH_COMMENTS_SUCCESS:
      return fromJS(action.comments)
    case types.CREATE_COMMENT_SUCCESS:
      return state.insert(0, fromJS(action.comment))
    default:
      return state
  }
}
