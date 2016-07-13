import expect from 'expect'
import { mount, shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'
import RestaurantSearchResultComponent from '../../src/js/new_restaurant/RestaurantSearchResultComponent'

describe('RestaurantSearchResultComponent', () => {
  it('calls restaurantSuggestionSelected when clicked', () => {
    let props = {
      restaurantSuggestionSelected: expect.createSpy(),
      suggestion: fromJS({name: 'Afuri', address: 'Roppongi'})
    }
    let component = shallow(<RestaurantSearchResultComponent {...props}/>)
    component.find('div').simulate('click')
    expect(props.restaurantSuggestionSelected.calls.length).toBe(1)
  })
})
