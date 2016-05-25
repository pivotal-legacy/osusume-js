import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './Reducer';
import ContainerRestaurantListComponent from './ContainerRestaurantListComponent';
import ContainerRestaurantDetailComponent from './ContainerRestaurantDetailComponent';

export default function AppComponent() {
    let store = createStore(
        reducer,
        applyMiddleware(thunkMiddleware)
    );
    
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={ContainerRestaurantListComponent}/>
                <Route path="/restaurants/:restaurantId" component={ContainerRestaurantDetailComponent}/>
            </Router>
        </Provider>
    );
}