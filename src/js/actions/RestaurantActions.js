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

function receiveDeletedRestaurant(hashHistoryParam) {
  return dispatch => {
    hashHistoryParam.push("/")
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

export function addNewRestaurant(restaurant, files, fileUploader, hashHistoryParam=hashHistory) {
  return function(dispatch, getState) {
    return dispatch(addNewRestaurantWithCurrentUser(restaurant, files, fileUploader, getState().currentUser, hashHistoryParam))
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

export function deleteRestaurant(restaurantId, hashHistoryParam=hashHistory) {
  return function(dispatch, getState) {
    return dispatch(deleteRestaurantWithCurrentUser(restaurantId, getState().currentUser, hashHistoryParam))
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
    .then(() => dispatch(receiveCreatedRestaurant(hashHistoryParam)))
  }
}

function uploadPhotos(nextAction, restaurant, files, fileUploader, currentUser, hashHistoryParam) {
  return dispatch => {
    return fileUploader.uploadPhotos(files).then((photoUrls) => {
      var photoUrlsArray = []
      for(var i = 0; i < photoUrls.length; i++ ) {
        photoUrlsArray.push({url: photoUrls[i]})
      }
      let restaurantWithPhotoUrl = Object.assign({}, restaurant, {photo_urls: photoUrlsArray})
      return dispatch(nextAction(restaurantWithPhotoUrl, currentUser, hashHistoryParam))
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

function addNewRestaurantWithCurrentUser(restaurant, files, fileUploader, currentUser, hashHistoryParam) {
  return dispatch => {
    restaurant['photo_urls'] = []
    if (files.length <= 0) {
      return dispatch(createRestaurant(restaurant, currentUser, hashHistoryParam))
    } else {
      return dispatch(uploadPhotos(createRestaurant, restaurant, files, fileUploader, currentUser, hashHistoryParam))
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

function deleteRestaurantWithCurrentUser(restaurantId, currentUser, hashHistoryParam) {
  let config = Object.assign({}, authorizationConfig(currentUser), {method: "DELETE"})
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants/${restaurantId}`, config)
    .then(response => dispatch(receiveDeletedRestaurant(hashHistoryParam)))
  }
}
