import expect from 'expect'
import { mount, shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'
import RestaurantSuggestionComponent from '../../src/js/new_restaurant/RestaurantSuggestionComponent'

describe('RestaurantSuggestionComponent', () => {
  it('calls selectSuggestion when clicked', () => {
    let props = {
      selectSuggestion: expect.createSpy(),
      suggestion: fromJS({name: 'Afuri', address: 'Roppongi'})
    }
    let component = shallow(<RestaurantSuggestionComponent {...props}/>)
    component.find('div').simulate('click')
    expect(props.selectSuggestion.calls.length).toBe(1)
  })
})
