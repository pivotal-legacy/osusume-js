import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './Reducer';
import ContainerRestaurantListComponent from './restaurant_list/ContainerRestaurantListComponent';
import ContainerRestaurantDetailComponent from './restaurant_detail/ContainerRestaurantDetailComponent';
import ContainerRestaurantNewComponent from './new_restaurant/ContainerRestaurantNewComponent';

export default function AppComponent() {
    let store = createStore(
        reducer,
        applyMiddleware(thunkMiddleware)
    );

    return (
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={ContainerRestaurantListComponent}/>
                <Route path="/restaurants/new" component={ContainerRestaurantNewComponent}/>
                <Route path="/restaurants/:restaurantId" component={ContainerRestaurantDetailComponent}/>
            </Router>
        </Provider>
    );
}
