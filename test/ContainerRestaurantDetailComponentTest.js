import expect from 'expect';
import { createStore } from 'redux';
import { mount, shallow } from 'enzyme';
import React from 'react';

import {mapStateToProps, mapDispatchToProps} from '../src/js/ContainerRestaurantDetailComponent';
import { fetchRestaurants } from '../src/js/Actions'

describe('ContainerRestaurantDetailComponent', () => {
    it('mapsStateToProps', () => {
        let state = [
            {id: 0, name: 'Afuri'},
            {id: 1, name: 'Tsukemen'}
        ];

        expect(mapStateToProps(state, {params: {restaurantId: 0}}).restaurant).toEqual({id: 0, name: 'Afuri'});
    });

    it('mapsDispatchToProps', () => {
        let dispatch = expect.createSpy();
        mapDispatchToProps(dispatch).fetchRestaurants();
        expect(dispatch).toHaveBeenCalledWith(fetchRestaurants());
    });
});