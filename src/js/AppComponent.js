import React from 'react'
import { Router, Route, Link, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers/Reducer'
import ContainerRestaurantListPage from './restaurant_list/ContainerRestaurantListPage'
import ContainerRestaurantDetailPage from './restaurant_detail/ContainerRestaurantDetailPage'
import AddRestaurantPage from './new_restaurant/AddRestaurantPage'
import ContainerEditRestaurantFormPage from './edit_restaurant/ContainerEditRestaurantFormPage'
import ContainerLoginPage from './login/ContainerLoginPage'
import ContainerMyPage from './my_page/ContainerMyPage'
import {updateLocalStorageWithUser} from './subscribers/LocalStorage'
import {requireAuth} from './Authentication'

export default function AppComponent() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  )
  store.subscribe(() => {updateLocalStorageWithUser(store.getState())})
  let ourRequireAuth = requireAuth.bind({store: store})

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={ContainerRestaurantListPage} onEnter={ourRequireAuth}/>
        <Route path="/login" component={ContainerLoginPage}/>
        <Route path="/restaurants/new" component={AddRestaurantPage} onEnter={ourRequireAuth}/>
        <Route path="/restaurants/:restaurant_id" component={ContainerRestaurantDetailPage} onEnter={ourRequireAuth}/>
        <Route path="/restaurants/:restaurant_id/edit" component={ContainerEditRestaurantFormPage} onEnter={ourRequireAuth}/>
        <Route path="/my_page" component={ContainerMyPage} onEnter={ourRequireAuth}/>
      </Router>
    </Provider>
  )
}
