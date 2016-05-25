import * as types from './constants/ActionTypes';
import fetch from 'isomorphic-fetch'

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

function fetchRestaurantsWithUser() {
    return dispatch => {
        dispatch(requestRestaurants());

        return fetch(`${process.env.API_SERVER}/restaurants`, authorizationConfig())
            .then(response => response.json())
            .then(json => dispatch(receiveRestaurants(json)));
    }
}

export function fetchRestaurants() {
    return dispatch => {
        if (token()) {
            return dispatch(fetchRestaurantsWithUser());
        } else {
            return dispatch(login(fetchRestaurantsWithUser));
        }
    }
}

function login(nextAction) {
    let email = 'danny';
    let password = 'danny';
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({email: email, password: password})
    };

    return dispatch => {
        dispatch(requestRestaurants());
        return fetch(`${process.env.API_SERVER}/session`, config)
            .then(response => response.json())
            .then((json) => {
                localStorage.setItem('token', json.token);
                dispatch(nextAction());
            })
    }
}

function authorizationConfig() {
    return {
        headers: { 'Authorization': `Bearer ${token()}` }
    };
}

function token() {
    return localStorage.getItem('token');
}