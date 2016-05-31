import expect from 'expect';
import { mount, shallow } from 'enzyme';
import React from 'react';
import CuisineTypeSelectionComponent from '../src/js/CuisineTypeSelectionComponent'

describe('CuisineTypeSelectionComponent', () => {
  it('displays selection dropdown if no cuisine type is selected', () => {
    let cuisineTypes = [
      {id: 0, name: 'Not Specified'},
      {id: 1, name: 'Japanese'},
      {id: 2, name: 'French'}
    ];
    const component = shallow(<CuisineTypeSelectionComponent cuisineTypes={cuisineTypes}/>);

    expect(component.find('select').length).toBe(1);
    expect(component.contains(<option value={0}>Not Specified</option>)).toEqual(true);
    expect(component.contains(<option value={1}>Japanese</option>)).toBe(true);
    expect(component.contains(<option value={2}>French</option>)).toBe(true);
  });
});
