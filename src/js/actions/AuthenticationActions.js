import {hashHistory} from "react-router"
import fetch from "isomorphic-fetch"
import {authorizationConfig} from './Authorization'
import {getToken, createSession, deleteSession} from '../Session'

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
        createSession(json.token, json.name, json.id)
        hashHistoryParam.push('/')
      })
  }
}

export function logout(hashHistoryParam = hashHistory) {
  let config = Object.assign({}, authorizationConfig(),
    {
      method: 'DELETE',
      body: JSON.stringify({token: getToken()})
    }
  )

  return dispatch => {
    return fetch(`${process.env.API_SERVER}/session`, config)
      .then(response => {
        deleteSession()
        hashHistoryParam.push('/login')
      })
  }
}
