import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './Reducer';
import ContainerRestaurantListComponent from './ContainerRestaurantListComponent';

let store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={ContainerRestaurantListComponent} />
        </Router>
    </Provider>
), document.getElementById('app'));