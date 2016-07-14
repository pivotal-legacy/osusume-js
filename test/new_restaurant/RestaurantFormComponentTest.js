import { shallow, mount } from 'enzyme'
import expect from 'expect'
import React from 'react'
import {fromJS} from 'immutable'
import RestaurantFormComponent from '../../src/js/new_restaurant/RestaurantFormComponent'
import ListComponent from '../../src/js/new_restaurant/ListComponent'
import CuisineTypeSelectionComponent from '../../src/js/new_restaurant/CuisineTypeSelectionComponent'
import PriceRangeSelectionComponent from '../../src/js/new_restaurant/PriceRangeSelectionComponent'

describe('RestaurantFormComponent', () => {
  const suggestion = fromJS({
    name: 'Afuri',
    address: 'Roppongi',
    place_id: 'some place id',
    latitude: '1.23',
    longitude: '2.34'
  })
  const cuisineTypes = fromJS([
    {id: 0, name: 'Not Specified'},
    {id: 1, name: 'Japanese'}
  ])
  const priceRanges = fromJS([
    {id: 0, range: 'Not Specified'},
    {id: 1, range: '¥0~999'}
  ])
  const addNewRestaurantHandler = expect.createSpy()
  let props = {
    suggestion: suggestion,
    priceRanges: priceRanges,
    cuisineTypes: cuisineTypes,
    addNewRestaurant: addNewRestaurantHandler,
    findRestaurantClicked: () => {},
    fetchCuisineTypes: () => {},
    fetchPriceRanges: () => {},
    fileUploder: () => {}
  }

  afterEach(function () {
    expect.restoreSpies()
  })

  it('renders correct elements', () => {
    const component = shallow(<RestaurantFormComponent {...props} />)
    const instance = component.instance()

    expect(component.contains(
      <CuisineTypeSelectionComponent
        cuisineTypes={cuisineTypes}
        changeHandler={instance.cuisineHandleChanged}/>)).toBe(true)
    expect(component.contains(
      <PriceRangeSelectionComponent
        priceRanges={priceRanges}
        changeHandler={instance.priceRangeHandleChanged} />)).toBe(true)
    expect(component.contains(<input id="file-input" className="file-input" type="file" multiple="multiple" onChange={instance.selectPhoto}/>)).toBe(true)
    expect(component.contains(<input type="button" value="select photos" onClick={instance.openPhotoLibrary} />)).toBe(true)
    expect(component.contains(<textarea className="notes" onChange={instance.noteChanged}></textarea>)).toBe(true)
  })

  it('calls fetchCuisinetypes in componentDidMount', () => {
    const modifiedProps = Object.assign({}, props, {
      fetchCuisineTypes: expect.createSpy()
    })
    mount(<RestaurantFormComponent {...modifiedProps} />)

    expect(modifiedProps.fetchCuisineTypes.calls.length).toBe(1)
  })

  it('calls fetchPriceRanges in componentDidMount', () => {
    const modifiedProps = Object.assign({}, props, {
      fetchPriceRanges: expect.createSpy()
    })
    mount(<RestaurantFormComponent {...modifiedProps} />)

    expect(modifiedProps.fetchPriceRanges.calls.length).toBe(1)
  })

  it('calls onSubmit handler with new restaurant data when "save" is clicked', () => {
    const component = mount(<RestaurantFormComponent {...props} />)
    const instance = component.instance()
    component.find('.notes').get(0).value = '美味しいです'
    component.find('.notes').simulate('change')
    component.find('button').simulate('click')

    expect(addNewRestaurantHandler).toHaveBeenCalledWith(
      {
        name: 'Afuri',
        address: 'Roppongi',
        place_id: 'some place id',
        latitude: '1.23',
        longitude: '2.34',
        cuisine_id: instance.state.selectedCuisine,
        price_range_id: instance.state.selectedPriceRange,
        notes: '美味しいです'
      },
      instance.state.selectedPhotos,
      instance.props.fileUploader
    )
  })

  it('sets state when cuisineHandleChanged is called with new cuisine type id ', () => {
    const component = shallow(<RestaurantFormComponent {...props} />)
    const instance = component.instance()
    instance.cuisineHandleChanged(10)

    expect(instance.state.selectedCuisine).toBe(10)
  })

  it('sets state when priceRangeHandleChanged is called with new cuisine type id ', () => {
    const component = shallow(<RestaurantFormComponent {...props} />)
    const instance = component.instance()
    instance.priceRangeHandleChanged('¥0~999')

    expect(instance.state.selectedPriceRange).toBe('¥0~999')
  })

  it('it sets file in state when input is changed ', () => {
    const component = shallow(<RestaurantFormComponent {...props} />)
    const files = [{name: "myfile.txt"}, {name: "newfile.txt"}]
    const names = files.map((file) => file.name)
    const e = {
      target: {
        value: "C:\fakepath\myfile.txt",
        files: files
      }
    }
    component.find('.file-input').simulate('change', e)
    const instance = component.instance()

    expect(instance.state.selectedPhotos).toBe(files)
    expect(instance.state.selectedPhotoNames[0]).toBe(names[0])
    expect(instance.state.selectedPhotoNames[1]).toBe(names[1])
    expect(component.contains(<ListComponent items={names} />)).toBe(true)
  })

  it('does not show the name and address if there is no suggestion', () => {
    const modifiedProps = Object.assign({}, props, {
      suggestion: null
    })
    const component = shallow(<RestaurantFormComponent {...modifiedProps} />)

    expect(component.find('.restaurant-suggestion').length).toEqual(0)
  })

  it('calls findRestaurantClicked when the find restaurant button is clicked', () => {
    const modifiedProps = Object.assign({}, props, {
      suggestion: null,
      findRestaurantClicked: expect.createSpy()
    })
    const component = shallow(<RestaurantFormComponent {...modifiedProps} />)

    component.find('.find-restaurant').simulate('click')

    expect(modifiedProps.findRestaurantClicked.calls.length).toBe(1)
  })
})
