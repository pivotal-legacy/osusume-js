import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import RestaurantSearchResult from '../../src/js/new_restaurant/RestaurantSearchResult'

describe('RestaurantSearchResult', () => {
  it('calls restaurantSuggestionSelected when clicked', () => {
    let props = {
      restaurantSuggestionSelected: expect.createSpy(),
      suggestion: {name: 'Afuri', address: 'Roppongi'}
    }
    let component = shallow(<RestaurantSearchResult {...props}/>)
    component.find('div').simulate('click')

    expect(props.restaurantSuggestionSelected.calls.length).toBe(1)
  })
})
