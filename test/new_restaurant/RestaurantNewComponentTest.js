import expect from 'expect'
import { mount, shallow } from 'enzyme'
import React from 'react'
import RestaurantNewComponent from '../../src/js/new_restaurant/RestaurantNewComponent'
import RestaurantSuggestionComponent from '../../src/js/new_restaurant/RestaurantSuggestionComponent'


describe('RestaurantNewComponent', () => {
  it('displays find restaurant label and input field when no suggestion has been selected', () => {
    const component = shallow(<RestaurantNewComponent />)
    expect(component.contains(<h1>find a restaurant</h1>)).toBe(true)
    expect(component.contains(<input ref=""/>)).toBe(true)
    expect(component.find('button').length).toBe(1)
  })

  it('displays new restaurant label and restaurant details when a restaurant has been selected', () => {
    let suggestion = {name: 'Afuri', address: 'Roppongi'}
    const component = shallow(<RestaurantNewComponent />)
    component.setState({suggestion: suggestion})
    expect(component.contains(<h1>add a restaurant</h1>)).toBe(true)
    expect(component.find('button').length).toBe(0)
  })

  it('calls onClick handler with input value when clicked', () => {
    const handler = expect.createSpy()
    const component = mount(<RestaurantNewComponent fetchSuggestions={handler} fetchCuisineTypes={()=>{}} fetchPriceRanges={()=>{}}/>)
    const input = component.find('input').get(0)
    input.value = 'AFURI'
    component.find('button').simulate('click')
    expect(handler).toHaveBeenCalledWith('AFURI')
  })

  it('shows suggestions when receives suggestions as props', () => {
    let suggestions = [
      {name: 'Afuri', address: 'Roppongi'},
      {name: 'Butagumi', address: 'Near The Station'}
    ]
    const component = shallow(<RestaurantNewComponent suggestions={suggestions}/>)
    const instance = component.instance()
    expect(component.contains(
      <RestaurantSuggestionComponent key="Afuri"
                                     suggestion={suggestions[0]}
                                     selectSuggestion={instance.selectSuggestion}/>
    )).toBe(true)
    expect(component.contains(
      <RestaurantSuggestionComponent key="Butagumi"
                                     suggestion={suggestions[1]}
                                     selectSuggestion={instance.selectSuggestion}/>
    )).toBe(true)
  })
})
