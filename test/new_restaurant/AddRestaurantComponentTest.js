import expect from 'expect'
import { mount, shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'
import AddRestaurantComponent from '../../src/js/new_restaurant/AddRestaurantComponent'
import ContainerRestaurantSearchComponent from '../../src/js/new_restaurant/ContainerRestaurantSearchComponent'
import ContainerRestaurantFormComponent from '../../src/js/new_restaurant/ContainerRestaurantFormComponent'

describe('RestaurantNewComponent', () => {
  it('displays RestaurantFormComponent by default', () => {
    const component = shallow(<AddRestaurantComponent/>)

    expect(component.contains(
      <ContainerRestaurantFormComponent suggestion={null} findRestaurantClicked={component.instance().findRestaurantClicked}/>
    )).toBe(true)
  })

  it('when findRestaurantClicked is called, show RestaurantSearchComponent', () => {
    const component = shallow(<AddRestaurantComponent/>)

    component.find(ContainerRestaurantFormComponent).props().findRestaurantClicked()

    expect(component.update().contains(
      <ContainerRestaurantSearchComponent restaurantSuggestionSelected={component.instance().restaurantSuggestionSelected} />
    )).toBe(true)
  })

  it('when restaurantSuggestionSelected is called, show the RestaurantFormComponent with the suggestion', () => {
    let suggestion = {name: 'Afuri', address: 'Roppongi', place_id: 'some-place-id'}
    const component = shallow(<AddRestaurantComponent/>)

    component.find(ContainerRestaurantFormComponent).props().findRestaurantClicked()
    component.update().find(ContainerRestaurantSearchComponent).props().restaurantSuggestionSelected(suggestion)

    expect(component.update().contains(
      <ContainerRestaurantFormComponent suggestion={suggestion} findRestaurantClicked={component.instance().findRestaurantClicked}/>
    )).toBe(true)
  })
})
