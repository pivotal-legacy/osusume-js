import * as types from "../constants/ActionTypes"
import fetch from "isomorphic-fetch"
import {authorizationConfig} from './Authorization'

function receiveSuggestions(json) {
  return {
    type: types.FETCH_SUGGESTIONS_SUCCESS,
    suggestions: json
  }
}

function receiveCuisineTypes(json) {
  return {
    type: types.FETCH_CUISINE_TYPES_SUCCESS,
    cuisineTypes: json
  }
}

function receivePriceRanges(json) {
  return {
    type: types.FETCH_PRICE_RANGES_SUCCESS,
    priceRanges: json
  }
}

function receiveComments(json) {
  return {
    type: types.FETCH_COMMENTS_SUCCESS,
    comments: json
  }
}

export function fetchSuggestions(name) {
  return function(dispatch, getState) {
    return dispatch(fetchSuggestionsWithCurrentUser(name, getState().currentUser))
  }
}

export function fetchCuisineTypes() {
  return function(dispatch, getState) {
    return dispatch(fetchCuisineTypesWithCurrentUser(getState().currentUser))
  }
}

export function fetchPriceRanges() {
  return function(dispatch, getState) {
    return dispatch(fetchPriceRangesWithCurrentUser(getState().currentUser))
  }
}

export function fetchComments(restaurantId) {
  return function(dispatch, getState) {
    return dispatch(fetchCommentsWithCurrentUser(restaurantId, getState().currentUser))
  }
}

function fetchSuggestionsWithCurrentUser(name, currentUser) {
  return dispatch => {
    let config = Object.assign({}, authorizationConfig(currentUser),
      {method: "POST", body: JSON.stringify({restaurantName: name})}
    )

    return fetch(`${process.env.API_SERVER}/restaurant_suggestions`, config)
      .then(response => response.json())
      .then(json => dispatch(receiveSuggestions(json)))
  }
}

function fetchCuisineTypesWithCurrentUser(currentUser) {
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/cuisines`, authorizationConfig(currentUser))
      .then(response => response.json())
      .then(json => dispatch(receiveCuisineTypes(json)))
  }
}

function fetchPriceRangesWithCurrentUser(currentUser) {
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/priceranges`, authorizationConfig(currentUser))
      .then(response => response.json())
      .then(json => dispatch(receivePriceRanges(json)))
  }
}

function fetchCommentsWithCurrentUser(restaurantId, currentUser) {
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants/${restaurantId}/comments`, authorizationConfig(currentUser))
      .then(response => response.json())
      .then(json => dispatch(receiveComments(json)))
  }
}
