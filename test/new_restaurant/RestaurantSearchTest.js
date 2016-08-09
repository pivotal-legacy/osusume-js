import expect from 'expect'
import { mount, shallow } from 'enzyme'
import React from 'react'
import RestaurantSearch from '../../src/js/new_restaurant/RestaurantSearch'
import RestaurantSearchResult from '../../src/js/new_restaurant/RestaurantSearchResult'

describe('RestaurantSearch', () => {
  it('calls onClick handler with input value when clicked', () => {
    const handler = expect.createSpy()
    let suggestions = []
    const component = mount(<RestaurantSearch
      suggestions={suggestions}
      fetchSuggestions={handler}
    />)
    const input = component.find('input').get(0)
    input.value = 'AFURI'
    component.find('input').simulate('change')
    component.find('button').simulate('click')
    expect(handler).toHaveBeenCalledWith('AFURI')
  })

  it('shows suggestions when receives suggestions as props', () => {
    let suggestions = [
      {name: 'Afuri', address: 'Roppongi', place_id: '12345'},
      {name: 'Butagumi', address: 'Near The Station', place_id: '67890'}
    ]
    let restaurantSuggestionSelected = () => {}
    const component = shallow(<RestaurantSearch
      restaurantSuggestionSelected={restaurantSuggestionSelected}
      suggestions={suggestions}
    />)
    expect(component.contains(
      <RestaurantSearchResult key="12345"
                              suggestion={suggestions[0]}
                              restaurantSuggestionSelected={restaurantSuggestionSelected}/>
    )).toBe(true)
    expect(component.contains(
      <RestaurantSearchResult key="67890"
                              suggestion={suggestions[1]}
                              restaurantSuggestionSelected={restaurantSuggestionSelected}/>
    )).toBe(true)
  })

  it('disables the find button when the input has no text', () => {
    const props = {
      restaurantSuggestionSelected: () => {},
      suggestions: []
    }
    const component = mount(<RestaurantSearch {...props}/>)

    expect(component.find('button').props().disabled).toBe(true)
  })

})
