import expect from 'expect';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import React from 'react';
import RestaurantListItemComponent from '../src/js/RestaurantListItemComponent';

describe('RestaurantListItemComponent', () => {
    it('displays the restaurant passed in props', () => {
        let restaurant = {id: 0, name: 'Afuri'};
        const component = shallow(<RestaurantListItemComponent restaurant={restaurant} />);

        expect(component.contains(<Link to={`/restaurants/0`}>Afuri</Link>)).toBe(true);
    });
});