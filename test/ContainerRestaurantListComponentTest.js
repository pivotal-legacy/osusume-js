import expect from 'expect';
import { fetchRestaurants } from '../src/js/Actions'

import React from 'react';
import {mapStateToProps, mapDispatchToProps} from '../src/js/ContainerRestaurantListComponent';

describe('ContainerRestaurantListComponent', () => {
    it('mapsStateToProps', () => {
        let restaurants = [
            {id: 0, name: 'Afuri'},
            {id: 1, name: 'Tsukemen'}
        ];
        let state = {restaurants: restaurants};

        expect(mapStateToProps(state).restaurants).toEqual(restaurants);
    });

    it('mapsDispatchToProps', () => {
        let dispatch = expect.createSpy();
        mapDispatchToProps(dispatch).fetchRestaurants();
        expect(dispatch).toHaveBeenCalledWith(fetchRestaurants());
    });
});
