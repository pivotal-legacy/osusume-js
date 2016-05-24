import expect from 'expect';
import { shallow } from 'enzyme';

import React from 'react';
import RestaurantComponent from '../src/js/RestaurantComponent';

describe('RestaurantComponent', () => {
    it('displays the restaurant passed in props', () => {
        let restaurant = {id: 0, name: 'Afuri'};
        const component = shallow(<RestaurantComponent restaurant={restaurant} />);

        expect(component.contains(<div>Afuri</div>)).toBe(true);
    });
});