import * as types from "../constants/ActionTypes"
import fetch from "isomorphic-fetch"
import {authorizationConfig} from './Authorization'

function receiveCreatedComment(json) {
  return {
    type: types.CREATE_COMMENT_SUCCESS,
    comment: json
  }
}

export function createComment(restaurantId, comment) {
  return function(dispatch, getState) {
    return dispatch(createCommentWithCurrentUser(restaurantId, comment, getState().currentUser))
  }
}

function createCommentWithCurrentUser(restaurantId, comment, currentUser) {
  let config = Object.assign({}, authorizationConfig(currentUser),
    {
      method: "POST",
      body: JSON.stringify({comment: comment})
    }
  )
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants/${restaurantId}/comments`, config)
    .then(response => response.json())
    .then(json => dispatch(receiveCreatedComment(json)))
  }
}
