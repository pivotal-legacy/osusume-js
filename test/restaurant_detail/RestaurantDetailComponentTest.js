import expect from 'expect';
import { mount, shallow } from 'enzyme';

import React from 'react';
import RestaurantDetailComponent from '../../src/js/restaurant_detail/RestaurantDetailComponent';

describe('RestaurantDetailComponent', () => {
    it('displays the restaurant passed in props', () => {
        let restaurant = {
            id: 0,
            name: 'Afuri',
            cuisine: {name: "Japanese"},
            price_range: '¥0~999',
            user: {id: 0, email: "danny", name: "Danny"},
            address: "Roppongi",
            notes: "good",
            photo_urls: [{url: 'https://hoge/image.jpg'}, {url: 'https://hoge/image2.jpg'}],
            num_likes: 5,
            created_at: "2016-05-26T10:03:17.736Z"
        };
        const component = shallow(<RestaurantDetailComponent restaurant={restaurant} />);

        expect(component.contains(<h1>Afuri</h1>)).toBe(true);
        expect(component.contains(<img key={0} src='https://hoge/image.jpg' width={210}  />)).toBe(true)
        expect(component.contains(<img key={1} src='https://hoge/image2.jpg' width={210}  />)).toBe(true)
        expect(component.contains(<div className="cuisine">Japanese</div>)).toBe(true);
        expect(component.contains(<div className="price-range">¥0~999</div>)).toBe(true);
        expect(component.contains(<div className="date">5/26/2016 by Danny</div>)).toBe(true);
        expect(component.contains(<div className="address">Roppongi</div>)).toBe(true);
        expect(component.contains(<div className="notes">good</div>)).toBe(true);
        expect(component.contains(<div className="num-likes">5 likes</div>)).toBe(true);
    });

    it('displays likes pluralized correctly', () => {
        expect(shallow(<RestaurantDetailComponent restaurant={{num_likes: 0}} />)
          .contains(<div className="num-likes">0 likes</div>)
        ).toBe(true);

        expect(shallow(<RestaurantDetailComponent restaurant={{num_likes: 1}} />)
          .contains(<div className="num-likes">1 like</div>)
        ).toBe(true);

        expect(shallow(<RestaurantDetailComponent restaurant={{num_likes: 2}} />)
          .contains(<div className="num-likes">2 likes</div>)
        ).toBe(true);
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
