import expect from 'expect';
import { createStore } from 'redux';
import { mount, shallow } from 'enzyme';

import React from 'react';
import {mapStateToProps} from '../src/js/ContainerRestaurantDetailComponent';

describe('ContainerRestaurantDetailComponent', () => {
    it('mapsStateToProps', () => {
        let state = [
            {id: 0, name: 'Afuri'},
            {id: 1, name: 'Tsukemen'}
        ];

        expect(mapStateToProps(state, {params: {restaurantId: 0}}).restaurant).toEqual({id: 0, name: 'Afuri'});
    });
});