import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'

import CuisineTypeSelectionComponent from '../../src/js/new_restaurant/CuisineTypeSelectionComponent'
import CuisineTypeOptionComponent from '../../src/js/new_restaurant/CuisineTypeOptionComponent'

describe('CuisineTypeSelectionComponent', () => {
  let cuisineTypes = fromJS([
    {id: 0, name: 'Not Specified'},
    {id: 1, name: 'Japanese'},
    {id: 2, name: 'French'}
  ])
  it('displays selection dropdown', () => {
    const component = shallow(<CuisineTypeSelectionComponent cuisineTypes={cuisineTypes}/>)

    expect(component.find('select').length).toBe(1)
    expect(component.contains(<CuisineTypeOptionComponent cuisine={cuisineTypes.get(0)} />))
    expect(component.contains(<CuisineTypeOptionComponent cuisine={cuisineTypes.get(1)} />))
    expect(component.contains(<CuisineTypeOptionComponent cuisine={cuisineTypes.get(2)} />))
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
})
