import expect from 'expect';
import { mount, shallow } from 'enzyme';

import React from 'react';
import RestaurantListComponent from '../src/js/RestaurantListComponent';
import RestaurantComponent from '../src/js/RestaurantComponent';

describe('RestaurantListComponent', () => {
    it('displays the restaurants passed as props', () => {
        let restaurants = [
            {id: 0, name: 'Afuri'},
            {id: 1, name: 'Tsukemen'}
        ];
        const component = shallow(<RestaurantListComponent restaurants={restaurants} />);

        expect(component.contains(<RestaurantComponent restaurant={{id: 0, name: 'Afuri'}} />)).toBe(true);
        expect(component.contains(<RestaurantComponent restaurant={{id: 1, name: 'Tsukemen'}} />)).toBe(true);
    });

    it('calls fetchRestaurants in the componentDidMount', () => {
        let props = {
            fetchRestaurants: expect.createSpy(),
            restaurants: []
        };
        expect(props.fetchRestaurants.calls.length).toBe(0);
        mount(<RestaurantListComponent {...props} />);
        expect(props.fetchRestaurants.calls.length).toBe(1);
    });
});