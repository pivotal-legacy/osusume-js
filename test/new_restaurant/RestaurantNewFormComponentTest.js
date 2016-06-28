import { shallow, mount } from 'enzyme'
import expect from 'expect'
import React from 'react'
import {fromJS} from 'immutable'
import RestaurantNewFormComponent from '../../src/js/new_restaurant/RestaurantNewFormComponent'
import CuisineTypeSelectionComponent from '../../src/js/new_restaurant/CuisineTypeSelectionComponent'
import PriceRangeSelectionComponent from '../../src/js/new_restaurant/PriceRangeSelectionComponent'

describe('RestaurantNewFormComponent displays correct components', () => {
  let suggestion = fromJS({name: 'Afuri', address: 'Roppongi'})
  let cuisineTypes = [
    {id: 0, name: 'Not Specified'},
    {id: 1, name: 'Japanese'}
  ]
  let priceRanges = [
    {id: 0, range: 'Not Specified'},
    {id: 1, range: '¥0~999'}
  ]

  afterEach(function () {
    expect.restoreSpies()
  })

  it('shows cuisine types dropdown', () => {
    let component = shallow(<RestaurantNewFormComponent suggestion={suggestion} cuisineTypes={cuisineTypes} />)
    let instance = component.instance()
    expect(component.contains(
      <CuisineTypeSelectionComponent
        cuisineTypes={cuisineTypes}
        changeHandler={instance.cuisineHandleChanged}/>)).toBe(true)
  })

  it('shows price ranges dropdown', () => {
    let component = shallow(<RestaurantNewFormComponent
      suggestion={suggestion} priceRanges={priceRanges} />)
    let instance = component.instance()
    expect(component.contains(
      <PriceRangeSelectionComponent
        priceRanges={priceRanges}
        changeHandler={instance.priceRangeHandleChanged} />)).toBe(true)
  })

  it('shows input for file upload', () => {
    let component = shallow(<RestaurantNewFormComponent
      suggestion={suggestion}
      priceRanges={priceRanges}
    />)
    let instance = component.instance()
    expect(component.contains(<label>Add Photo</label>)).toBe(true)
    expect(component.contains(<input type="file" onChange={instance.selectPhoto}/>)).toBe(true)
  })

  it('shows input area for notes', () => {
    let component = shallow(<RestaurantNewFormComponent suggestion={suggestion} />)
    let instance = component.instance()
    expect(component.contains(<textarea className="notes" onChange={instance.noteChanged}></textarea>)).toBe(true)
  })
})

describe('RestaurantNewFormComponent calls correct function', () => {
  let suggestion = fromJS({name: 'Afuri', address: 'Roppongi'})
  let hashHistory = {
    push: () => {}
  }

  it('calls fetchCuisinetypes  in componentDidMount', () => {
    let props = {
      fetchCuisineTypes: expect.createSpy(),
      fetchPriceRanges: () => {}
    }
    mount(<RestaurantNewFormComponent suggestion={suggestion} {...props} />)
    expect(props.fetchCuisineTypes.calls.length).toBe(1)
  })

  it('calls fetchPriceRanges  in componentDidMount', () => {
    let props = {
      fetchCuisineTypes: () => {},
      fetchPriceRanges: expect.createSpy()
    }
    mount(<RestaurantNewFormComponent suggestion={suggestion} {...props} />)
    expect(props.fetchPriceRanges.calls.length).toBe(1)
  })

  it('calls onSubmit handler with new restaurant data when "save" is clicked', () => {
    const handler = expect.createSpy()
    const component = mount(<RestaurantNewFormComponent hashHistory={hashHistory} suggestion={suggestion} addNewRestaurant={handler} fetchCuisineTypes={()=>{}} fetchPriceRanges={()=>{}} fileUploder={()=>{}}/>)
    let instance = component.instance()
    component.find('.notes').get(0).value = '美味しいです'
    component.find('.notes').simulate('change')
    component.find('button').simulate('click')
    expect(handler).toHaveBeenCalledWith(
      {
        name: 'Afuri',
        address: 'Roppongi',
        cuisine_id: instance.state.selectedCuisine,
        price_range_id: instance.state.selectedPriceRange,
        notes: '美味しいです'
      },
      instance.state.selectedPhoto,
      instance.props.fileUploader
    )
  })

  it('redirects to the list of restaurants when "save" is clicked', () => {
    const handler = expect.createSpy()
    const hashHandler = expect.spyOn(hashHistory, 'push')
    const component = mount(<RestaurantNewFormComponent hashHistory={hashHistory} suggestion={suggestion} addNewRestaurant={handler} fetchCuisineTypes={()=>{}} fetchPriceRanges={()=>{}} fileUploder={()=>{}}/>)
    let instance = component.instance()
    component.find('button').simulate('click')
    expect(hashHandler).toHaveBeenCalledWith('/')
  })

  it('sets state when cuisineHandleChanged is called with new cuisine type id ', () => {
    const component = shallow(<RestaurantNewFormComponent suggestion={suggestion}/>)
    let instance = component.instance()
    instance.cuisineHandleChanged(10)
    expect(instance.state.selectedCuisine).toBe(10)
  })

  it('sets state when priceRangeHandleChanged is called with new cuisine type id ', () => {
    const component = shallow(<RestaurantNewFormComponent suggestion={suggestion}/>)
    let instance = component.instance()
    instance.priceRangeHandleChanged('¥0~999')
    expect(instance.state.selectedPriceRange).toBe('¥0~999')
  })

  it('it sets file in state when input is changed ', () => {
    const component = shallow(<RestaurantNewFormComponent suggestion={suggestion}/>)
    let file = {name: "myfile.txt"}
    let e = {
      target: {
        value: "C:\fakepath\myfile.txt",
        files: [file]
      }
    }
    component.find('input').simulate('change', e)
    let instance = component.instance()
    expect(instance.state.selectedPhoto).toBe(file)
  })
})
