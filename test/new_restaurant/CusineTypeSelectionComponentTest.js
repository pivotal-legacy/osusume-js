import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'

import CuisineTypeSelectionComponent from '../../src/js/new_restaurant/CuisineTypeSelectionComponent'

describe('CuisineTypeSelectionComponent', () => {
  let cuisineTypes = fromJS([
    {id: 0, name: 'Not Specified'},
    {id: 1, name: 'Japanese'},
    {id: 2, name: 'French'}
  ])

  it('displays selection dropdown', () => {
    const component = shallow(<CuisineTypeSelectionComponent cuisineTypes={cuisineTypes}/>)

    expect(component.find('select').length).toBe(1)
    expect(component.contains(
      <option key={0} value={0}>Not Specified</option>
    )).toEqual(true)
    expect(component.contains(
      <option key={1} value={1}>Japanese</option>
    )).toEqual(true)
    expect(component.contains(
      <option key={2} value={2}>French</option>
    )).toEqual(true)
  })

  it('calls changeHandler with selected cuisine type on change', () => {
    const handler = expect.createSpy()
    const component = shallow(<CuisineTypeSelectionComponent
      cuisineTypes={cuisineTypes}
      changeHandler={handler}
    />)
    let e = {target: {options: {selectedIndex: 1, 1: {value: 1}}}}
    component.find('select').simulate('change', e)

    expect(handler).toHaveBeenCalledWith(1)
  })

  it('selects passed in cuisine by default', () => {
    const props = {
      cuisineTypes: cuisineTypes,
      selectedCuisine: 1
    }

    const component = shallow(<CuisineTypeSelectionComponent {...props} />)

    expect(component.find('select').props().defaultValue).toEqual(1)
  })
})
