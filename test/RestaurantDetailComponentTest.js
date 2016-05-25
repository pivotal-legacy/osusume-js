import expect from 'expect';
import { mount, shallow } from 'enzyme';

import React from 'react';
import RestaurantDetailComponent from '../src/js/RestaurantDetailComponent';

describe('RestaurantDetailComponent', () => {
    it('displays the restaurant passed in props', () => {
        let restaurant = {id: 0, name: 'Afuri'};
        const component = shallow(<RestaurantDetailComponent restaurant={restaurant} />);

        expect(component.contains(<div>Afuri</div>)).toBe(true);
    });

    it('fetches the restaurants if no restaurant is passed', () => {
        let props = {
            fetchRestaurants: expect.createSpy(),
            restaurant: undefined
        };
        expect(props.fetchRestaurants.calls.length).toBe(0);
        mount(<RestaurantDetailComponent {...props} />);
        expect(props.fetchRestaurants.calls.length).toBe(1);
    });

    it('does not fetch the restaurants if a restaurant is passed', () => {
        let props = {
            fetchRestaurants: expect.createSpy(),
            restaurant: {id: 0, name: 'Afuri'}
        };
        mount(<RestaurantDetailComponent {...props} />);
        expect(props.fetchRestaurants.calls.length).toBe(0);
    });
});