import * as types from "../constants/ActionTypes"
import fetch from "isomorphic-fetch"
import {hashHistory} from "react-router"
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
  return dispatch => {
    let config = Object.assign({}, authorizationConfig(),
      {method: "POST", body: JSON.stringify({restaurantName: name})}
    )

    return fetch(`${process.env.API_SERVER}/restaurant_suggestions`, config)
      .then(response => response.json())
      .then(json => dispatch(receiveSuggestions(json)))
  }
}

export function fetchCuisineTypes() {
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/cuisines`, authorizationConfig())
      .then(response => response.json())
      .then(json => dispatch(receiveCuisineTypes(json)))
  }
}


export function fetchPriceRanges() {
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/priceranges`, authorizationConfig())
      .then(response => response.json())
      .then(json => dispatch(receivePriceRanges(json)))
  }
}

export function fetchComments(restaurantId) {
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants/${restaurantId}/comments`, authorizationConfig())
      .then(response => response.json())
      .then(json => dispatch(receiveComments(json)))
  }
}

export function login(email, password, hashHistoryParam = hashHistory) {
  let config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: email, password: password})
  }

  return dispatch => {
    return fetch(`${process.env.API_SERVER}/session`, config)
      .then(response => response.json())
      .then((json) => {
        localStorage.setItem('token', json.token)
        localStorage.setItem('userName', json.name)
        hashHistoryParam.push('/')
      })
  }
}
