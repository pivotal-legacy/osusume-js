import * as types from './constants/ActionTypes';
import fetch from 'isomorphic-fetch'

const API_SERVER = 'http://localhost:8080';
function requestRestaurants() {
    return {
        type: types.FETCH_RESTAURANTS_REQUEST
    }
}

function receiveRestaurants(json) {
    return {
        type: types.FETCH_RESTAURANTS_SUCCESS,
        restaurants: json
    }
}

export function fetchRestaurants() {
    return dispatch => {
        dispatch(requestRestaurants())
        return fetch(`${API_SERVER}/restaurants`)
            .then(response => response.json())
            .then(json => dispatch(receiveRestaurants(json)))
    }
}
