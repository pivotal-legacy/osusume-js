import * as types from '../constants/ActionTypes'

const INITIAL_STATE = []

export default function comments(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_COMMENTS_SUCCESS:
      return action.comments
    case types.CREATE_COMMENT_SUCCESS:
      return [action.comment].concat(state)
    default:
      return state
  }
}
