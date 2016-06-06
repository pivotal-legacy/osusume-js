import expect from 'expect';
import { shallow } from 'enzyme';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';

import React from 'react';
import AppComponent from '../src/js/AppComponent';
import ContainerRestaurantListComponent from '../src/js/restaurant_list/ContainerRestaurantListComponent';
import ContainerRestaurantDetailComponent from '../src/js/restaurant_detail/ContainerRestaurantDetailComponent';
import ContainerRestaurantNewComponent from '../src/js/new_restaurant/ContainerRestaurantNewComponent';

describe('AppComponent', () => {
    it('renders all the routes', () => {
        const component = shallow(<AppComponent />);

        expect(component.contains(<Route path="/" component={ContainerRestaurantListComponent}/>)).toBe(true);
        expect(component.contains(<Route path="/restaurants/:restaurantId" component={ContainerRestaurantDetailComponent}/>)).toBe(true);
        expect(component.contains(<Route path="/restaurants/new" component={ContainerRestaurantNewComponent}/>)).toBe(true);
        expect(component.find(Provider).length).toBe(1);
        expect(component.find(Router).length).toBe(1);
    });
});
