import expect from 'expect'
import { mount, shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'
import FindRestaurantComponent from '../../src/js/new_restaurant/FindRestaurantComponent'
import RestaurantSuggestionComponent from '../../src/js/new_restaurant/RestaurantSuggestionComponent'

describe('FindRestaurantComponent', () => {
  it('calls onClick handler with input value when clicked', () => {
    const handler = expect.createSpy()
    let suggestions = []
    const component = mount(<FindRestaurantComponent
      suggestions={suggestions}
      fetchSuggestions={handler}
    />)
    const input = component.find('input').get(0)
    input.value = 'AFURI'
    component.find('button').simulate('click')
    expect(handler).toHaveBeenCalledWith('AFURI')
  })

  it('shows suggestions when receives suggestions as props', () => {
    let suggestions = fromJS([
      {name: 'Afuri', address: 'Roppongi'},
      {name: 'Butagumi', address: 'Near The Station'}
    ])
    let selectSuggestion = () => {}
    const component = shallow(<FindRestaurantComponent
      selectSuggestion={selectSuggestion}
      suggestions={suggestions}
    />)
    expect(component.contains(
      <RestaurantSuggestionComponent key="Afuri"
                                     suggestion={suggestions.get(0)}
                                     selectSuggestion={selectSuggestion}/>
    )).toBe(true)
    expect(component.contains(
      <RestaurantSuggestionComponent key="Butagumi"
                                     suggestion={suggestions.get(1)}
                                     selectSuggestion={selectSuggestion}/>
    )).toBe(true)
  })
})
