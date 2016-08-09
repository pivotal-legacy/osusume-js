import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import AddRestaurantPage from '../../src/js/new_restaurant/AddRestaurantPage'
import ContainerRestaurantSearch from '../../src/js/new_restaurant/ContainerRestaurantSearch'
import ContainerRestaurantForm from '../../src/js/new_restaurant/ContainerRestaurantForm'

describe('AddRestaurantPage', () => {
  it('displays RestaurantForm by default', () => {
    const component = shallow(<AddRestaurantPage/>)

    expect(component.contains(
      <ContainerRestaurantForm suggestion={null} findRestaurantClicked={component.instance().findRestaurantClicked}/>
    )).toBe(true)
  })

  it('when findRestaurantClicked is called, show RestaurantSearch', () => {
    const component = shallow(<AddRestaurantPage/>)

    component.find(ContainerRestaurantForm).props().findRestaurantClicked()

    expect(component.update().contains(
      <ContainerRestaurantSearch restaurantSuggestionSelected={component.instance().restaurantSuggestionSelected} />
    )).toBe(true)
  })

  it('when restaurantSuggestionSelected is called, show the RestaurantForm with the suggestion', () => {
    let suggestion = {name: 'Afuri', address: 'Roppongi', place_id: 'some-place-id'}
    const component = shallow(<AddRestaurantPage/>)

    component.find(ContainerRestaurantForm).props().findRestaurantClicked()
    component.update().find(ContainerRestaurantSearch).props().restaurantSuggestionSelected(suggestion)

    expect(component.update().contains(
      <ContainerRestaurantForm suggestion={suggestion} findRestaurantClicked={component.instance().findRestaurantClicked}/>
    )).toBe(true)
  })
})
