import * as types from "./constants/ActionTypes"
import fetch from "isomorphic-fetch"
import {hashHistory} from "react-router"

function receiveRestaurants(json) {
  return {
    type: types.FETCH_RESTAURANTS_SUCCESS,
    restaurants: json
  }
}

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

function receiveCreatedRestaurant(json) {
  return {
    type: types.CREATE_RESTAURANT_SUCCESS,
    restaurant: json
  }
}

export function fetchRestaurants() {
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants`, authorizationConfig())
      .then(response => response.json())
      .then(json => dispatch(receiveRestaurants(json)))
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

function createRestaurant(restaurant) {
  let config = Object.assign({}, authorizationConfig(),
    {
      method: "POST",
      body: JSON.stringify(
        {
          restaurant: restaurant
        }
      )
    }
  )
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants`, config)
    .then(response => response.json())
    .then(json => dispatch(receiveCreatedRestaurant(json)))
  }
}

function uploadPhoto(nextAction, restaurant, file, fileUploader) {
  return dispatch => {
    return fileUploader.upload(file).then((photoUrl) => {
      let restaurantWithPhotoUrl = Object.assign({}, restaurant, {photo_urls: [{url: photoUrl}]})
      dispatch(nextAction(restaurantWithPhotoUrl))
    })
  }
}

export function addNewRestaurant(restaurant, file, fileUploader) {
  return dispatch => {
    restaurant['photo_urls'] = []

    if (file == undefined) {
      return dispatch(createRestaurant(restaurant))
    } else {
      return dispatch(uploadPhoto(createRestaurant, restaurant, file, fileUploader))
    }
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
        hashHistoryParam.push('/')
      })
  }
}

function authorizationConfig() {
  return {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  }
}
