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
        <Route path="/restaurants/new" component={ContainerRestaurantNewComponent} onEnter={ourRequireAuth}/>
        <Route path="/restaurants/:restaurantId" component={ContainerRestaurantDetailComponent} onEnter={ourRequireAuth}/>
        <Route path="/my_page" component={ContainerMyPageComponent} onEnter={ourRequireAuth}/>
        <Route path="/map" component={MapComponent} onEnter={ourRequireAuth}/>
      </Router>
    </Provider>
  )
}
