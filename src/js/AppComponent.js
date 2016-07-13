import React from 'react'
import { Router, Route, Link, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/Reducer'
import ContainerRestaurantListComponent from './restaurant_list/ContainerRestaurantListComponent'
import ContainerRestaurantDetailComponent from './restaurant_detail/ContainerRestaurantDetailComponent'
import AddRestaurantComponent from './new_restaurant/AddRestaurantComponent'
import ContainerLoginComponent from './login/ContainerLoginComponent'
import ContainerMyPageComponent from './my_page/ContainerMyPageComponent'
import MapComponent from './map/MapComponent'
import {updateLocalStorageWithUser} from './subscribers/LocalStorage'
import {requireAuth} from './Authentication'

export default function AppComponent() {

  let store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
  )
  store.subscribe(() => {updateLocalStorageWithUser(store.getState())})
  let ourRequireAuth = requireAuth.bind({store: store})

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={ContainerRestaurantListComponent} onEnter={ourRequireAuth}/>
        <Route path="/login" component={ContainerLoginComponent}/>
        <Route path="/restaurants/new" component={AddRestaurantComponent} onEnter={ourRequireAuth}/>
        <Route path="/restaurants/:restaurant_id/map/:place_id" component={MapComponent} onEnter={ourRequireAuth}/>
        <Route path="/restaurants/:restaurant_id" component={ContainerRestaurantDetailComponent} onEnter={ourRequireAuth}/>
        <Route path="/my_page" component={ContainerMyPageComponent} onEnter={ourRequireAuth}/>
      </Router>
    </Provider>
  )
}
