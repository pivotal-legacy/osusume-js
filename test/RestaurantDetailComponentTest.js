import expect from 'expect';
import { shallow } from 'enzyme';

import React from 'react';
import RestaurantDetailComponent from '../src/js/RestaurantDetailComponent';

describe('RestaurantDetailComponent', () => {
    it('displays the restaurant passed in props', () => {
        let restaurant = {id: 0, name: 'Afuri'};
        const component = shallow(<RestaurantDetailComponent restaurant={restaurant} />);

        expect(component.contains(<div>Afuri</div>)).toBe(true);
    });
});