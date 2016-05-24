import expect from 'expect';
import { createStore } from 'redux';
import { mount, shallow } from 'enzyme';
import { fetchRestaurants } from '../src/js/Actions'

import React from 'react';
import {mapStateToProps, mapDispatchToProps} from '../src/js/ContainerRestaurantListComponent';

describe('ContainerRestaurantListComponent', () => {
    it('mapsStateToProps', () => {
        let state = [
            {id: 0, name: 'Afuri'},
            {id: 1, name: 'Tsukemen'}
        ];

        expect(mapStateToProps(state).restaurants).toEqual(state);
    });

    it('mapsDispatchToProps', () => {
        let dispatch = expect.createSpy();
        mapDispatchToProps(dispatch).fetchRestaurants();
        expect(dispatch).toHaveBeenCalledWith(fetchRestaurants());
    });
});