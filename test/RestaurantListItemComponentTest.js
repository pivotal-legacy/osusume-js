import expect from 'expect';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import React from 'react';
import RestaurantListItemComponent from '../src/js/RestaurantListItemComponent';

describe('RestaurantListItemComponent', () => {
    it('displays the restaurant passed in props', () => {
        let restaurant = {
            id: 0,
            name: 'Afuri',
            cuisine: {name: 'Ramen'},
            price_range: '1000 - 2000',
            address: 'Iidabashi West Exit',
            num_likes: 3,
            created_by_user_name: 'Kalle Anka',
            created_at: '2016-05-25T01:41:17.125Z',
        };
        const component = shallow(<RestaurantListItemComponent restaurant={restaurant} />);

        expect(component.find(Link).length).toEqual(1);
        expect(component.find(Link).prop('to')).toEqual('/restaurants/0');
        expect(component.find(Link).prop('children')).toEqual("Afuri");

        expect(component.find('.cuisine').length).toEqual(1);
        expect(component.find('.cuisine').text()).toEqual('Ramen');

        expect(component.find('.price_range').length).toEqual(1);
        expect(component.find('.price_range').text()).toEqual('1000 - 2000');

        expect(component.find('.address').length).toEqual(1);
        expect(component.find('.address').text()).toEqual('Iidabashi West Exit');

        expect(component.find('.number_likes').length).toEqual(1);
        expect(component.find('.number_likes').text()).toEqual(3);

        expect(component.find('.created_by_user_name').length).toEqual(1);
        expect(component.find('.created_by_user_name').text()).toEqual('Kalle Anka');

        expect(component.find('.created_at').length).toEqual(1);
        expect(component.find('.created_at').text()).toEqual('2016-05-25T01:41:17.125Z');
    });

    it('displays no cuisine if cuisine is null', () => {
        let restaurant = {id: 0, name: 'Afuri', cuisine: null};
        const component = shallow(<RestaurantListItemComponent restaurant={restaurant} />);
        expect(component.find('.cuisine').length).toEqual(1);
        expect(component.find('.cuisine').text()).toEqual('');
    });
});