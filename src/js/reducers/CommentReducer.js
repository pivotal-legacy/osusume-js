import * as types from '../constants/ActionTypes';

export function comments(state = [], action) {
  switch (action.type) {
    case types.FETCH_COMMENTS_SUCCESS:
      return action.comments
    case types.CREATE_COMMENT_SUCCESS:
      return [action.comment, ...state]
    default:
      return state
  }
}
