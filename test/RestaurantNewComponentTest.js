import expect from 'expect';
import { mount, shallow } from 'enzyme';

import React from 'react';
import RestaurantNewComponent from '../src/js/RestaurantNewComponent';

describe('RestaurantNewComponent', () => {
  it('displays find restaurant label and input field', () => {
    const component = shallow(<RestaurantNewComponent />);
    expect(component.contains(<h1>find a restaurant</h1>)).toBe(true);
    expect(component.contains(<input/>)).toBe(true);
  });
});
