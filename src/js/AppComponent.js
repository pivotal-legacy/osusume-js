import React from 'react'
import { Router, Route, Link, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/Reducer'
import ContainerRestaurantListComponent from './restaurant_list/ContainerRestaurantListComponent'
import ContainerRestaurantDetailComponent from './restaurant_detail/ContainerRestaurantDetailComponent'
import ContainerRestaurantNewComponent from './new_restaurant/ContainerRestaurantNewComponent'
import ContainerLoginComponent from './login/ContainerLoginComponent'
import {requireAuth} from './login/Authentication'

export default function AppComponent() {
  let store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
  )

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={ContainerRestaurantListComponent} onEnter={requireAuth}/>
        <Route path="/login" component={ContainerLoginComponent}/>
        <Route path="/restaurants/new" component={ContainerRestaurantNewComponent} onEnter={requireAuth}/>
        <Route path="/restaurants/:restaurantId" component={ContainerRestaurantDetailComponent} onEnter={requireAuth}/>
      </Router>
    </Provider>
  )
}
