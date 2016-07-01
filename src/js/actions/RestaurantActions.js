import * as types from "../constants/ActionTypes"
import fetch from "isomorphic-fetch"
import {authorizationConfig} from './Authorization'
import {hashHistory} from 'react-router'

function receiveRestaurants(json) {
  return {
    type: types.FETCH_RESTAURANTS_SUCCESS,
    restaurants: json
  }
}

function receiveRestaurant(json) {
  return {
    type: types.FETCH_RESTAURANT_SUCCESS,
    restaurant: json
  }
}

function receiveCreatedRestaurant(hashHistoryParam) {
  return dispatch => {
    return hashHistoryParam.push("/")
  }
}

function receiveCreatedLike(json) {
  return {
    type: types.CREATE_LIKE_SUCCESS,
    restaurantId: json.restaurantId
  }
}

function receiveRemovedLike(restaurantId) {
  return {
    type: types.REMOVE_LIKE_SUCCESS,
    restaurantId: restaurantId
  }
}

export function fetchRestaurant(restaurantId) {
  return function(dispatch, getState) {
    return dispatch(fetchRestaurantWithCurrentUser(restaurantId, getState().currentUser))
  }
}

export function fetchRestaurants() {
  return function(dispatch, getState) {
    return dispatch(fetchRestaurantsWithCurrentUser(getState().currentUser))
  }
}

export function addNewRestaurant(restaurant, file, fileUploader, hashHistoryParam=hashHistory) {
  return function(dispatch, getState) {
    return dispatch(addNewRestaurantWithCurrentUser(restaurant, file, fileUploader, getState().currentUser, hashHistoryParam))
  }
}

export function like(restaurantId) {
  return function(dispatch, getState) {
    return dispatch(likeWithCurrentUser(restaurantId, getState().currentUser))
  }
}

export function removeLike(restaurantId) {
  return function(dispatch, getState) {
    return dispatch(removeLikeWithCurrentUser(restaurantId, getState().currentUser))
  }
}

function createRestaurant(restaurant, currentUser, hashHistoryParam) {
  let config = Object.assign({}, authorizationConfig(currentUser),
    {
      method: "POST",
      body: JSON.stringify({restaurant: restaurant})
    }
  )
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants`, config)
    .then(dispatch(receiveCreatedRestaurant(hashHistoryParam)))
  }
}

function uploadPhoto(nextAction, restaurant, file, fileUploader, currentUser, hashHistoryParam) {
  return dispatch => {
    return fileUploader.upload(file).then((photoUrl) => {
      let restaurantWithPhotoUrl = Object.assign({}, restaurant, {photo_urls: [{url: photoUrl}]})
      dispatch(nextAction(restaurantWithPhotoUrl, currentUser, hashHistoryParam))
    })
  }
}

function fetchRestaurantWithCurrentUser(restaurantId, currentUser) {
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants/${restaurantId}`, authorizationConfig(currentUser))
      .then(response => response.json())
      .then(json => dispatch(receiveRestaurant(json)))
  }
}

function fetchRestaurantsWithCurrentUser(currentUser) {
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants`, authorizationConfig(currentUser))
      .then(response => response.json())
      .then(json => dispatch(receiveRestaurants(json)))
  }
}

function addNewRestaurantWithCurrentUser(restaurant, file, fileUploader, currentUser, hashHistoryParam) {
  return dispatch => {
    restaurant['photo_urls'] = []

    if (file == undefined) {
      return dispatch(createRestaurant(restaurant, currentUser, hashHistoryParam))
    } else {
      return dispatch(uploadPhoto(createRestaurant, restaurant, file, fileUploader, currentUser, hashHistoryParam))
    }
  }
}

function likeWithCurrentUser(restaurantId, currentUser) {
  let config = Object.assign({}, authorizationConfig(currentUser), {method: "POST"})
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants/${restaurantId}/likes`, config)
    .then(response => response.json())
    .then(json => dispatch(receiveCreatedLike(json)))
  }
}

function removeLikeWithCurrentUser(restaurantId, currentUser) {
  let config = Object.assign({}, authorizationConfig(currentUser), {method: "DELETE"})
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants/${restaurantId}/likes`, config)
    .then(response => dispatch(receiveRemovedLike(parseInt(restaurantId))))
  }
}
