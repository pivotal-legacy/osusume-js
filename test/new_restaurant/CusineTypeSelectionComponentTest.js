import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import CuisineTypeSelectionComponent from '../../src/js/new_restaurant/CuisineTypeSelectionComponent'

describe('CuisineTypeSelectionComponent', () => {
  let cuisineTypes = [
    {id: 0, name: 'Not Specified'},
    {id: 1, name: 'Japanese'},
    {id: 2, name: 'French'}
  ];
  it('displays selection dropdown', () => {
    const component = shallow(<CuisineTypeSelectionComponent cuisineTypes={cuisineTypes}/>);

    expect(component.find('select').length).toBe(1);
    expect(component.contains(<option value={0}>Not Specified</option>)).toEqual(true);
    expect(component.contains(<option value={1}>Japanese</option>)).toBe(true);
    expect(component.contains(<option value={2}>French</option>)).toBe(true);
  });

  it('calls changeHandler with selected cuisine type on change', () => {
    const handler = expect.createSpy();
    const component = shallow(<CuisineTypeSelectionComponent
      cuisineTypes={cuisineTypes}
      changeHandler={handler}
    />);
    let e = {target: {options: {selectedIndex: 1, 1: {value: 1}}}}
    component.find('select').simulate('change', e);
    expect(handler).toHaveBeenCalledWith(1)
  })
});
