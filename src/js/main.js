import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import AppComponent from './AppComponent';
import '../scss/main.scss';

render((
    <AppComponent />
), document.getElementById('app'));
