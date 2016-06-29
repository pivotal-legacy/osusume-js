import expect from 'expect'
import { mount, shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'
import RestaurantNewComponent from '../../src/js/new_restaurant/RestaurantNewComponent'
import FindRestaurantComponent from '../../src/js/new_restaurant/FindRestaurantComponent'
import ContainerRestaurantNewFormComponent from '../../src/js/new_restaurant/ContainerRestaurantNewFormComponent'

describe('RestaurantNewComponent', () => {
  it('displays find restaurant component when no suggestion has been selected', () => {
    let suggestions = [{name: 'Afuri', address: 'Roppongi', place_id: 'some-place-id'}]
    let fetchSuggestions = () => {}
    const component = shallow(<RestaurantNewComponent suggestions={suggestions} fetchSuggestions={fetchSuggestions}/>)
    expect(component.contains(
      <FindRestaurantComponent
        suggestions={suggestions}
        fetchSuggestions={fetchSuggestions}
        selectSuggestion={component.instance().selectSuggestion}
      />)).toBe(true)
  })

  it('displays new restaurant label and restaurant details when a restaurant has been selected', () => {
    let suggestion = {name: 'Afuri', address: 'Roppongi', place_id: 'some-place-id'}
    const component = shallow(<RestaurantNewComponent />)
    component.setState({suggestion: suggestion})
    expect(component.contains(
      <ContainerRestaurantNewFormComponent
        suggestion={suggestion}
      />)).toBe(true)
  })
})
