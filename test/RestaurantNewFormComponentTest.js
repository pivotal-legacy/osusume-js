import { shallow, mount } from 'enzyme'
import expect from 'expect'
import React from 'react'
import RestaurantNewFormComponent from '../src/js/RestaurantNewFormComponent'
import CuisineTypeSelectionComponent from '../src/js/CuisineTypeSelectionComponent'
import PriceRangeSelectionComponent from '../src/js/PriceRangeSelectionComponent'

describe('RestaurantNewFormComponent displays correct components', () => {
  let suggestion = {name: 'Afuri', address: 'Roppongi'}
  let cuisineTypes = [
    {id: 0, name: 'Not Specified'},
    {id: 1, name: 'Japanese'}
  ]
  let priceRanges = [
    {id: 0, range: 'Not Specified'},
    {id: 1, range: '¥0~999'}
  ]

  it('displays restaurant details', () => {
    let component = shallow(<RestaurantNewFormComponent suggestion={suggestion} />)
    expect(component.contains(<div>{suggestion.name}</div>)).toBe(true)
    expect(component.contains(<div>{suggestion.address}</div>)).toBe(true)
  });

  it('shows cuisine types dropdown', () => {
    let component = shallow(<RestaurantNewFormComponent suggestion={suggestion} cuisineTypes={cuisineTypes} />)
    let instance = component.instance();
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
})

  describe('RestaurantNewFormComponent calls correct function', () => {
    let suggestion = {name: 'Afuri', address: 'Roppongi'}

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

  it('calls onSubmit handler with new restaurant data when clicked', () => {
    const handler = expect.createSpy();
    const component = mount(<RestaurantNewFormComponent suggestion={suggestion} addNewRestaurant={handler} fetchCuisineTypes={()=>{}} fetchPriceRanges={()=>{}} fileUploder={()=>{}}/>);
    let instance = component.instance()
    component.find('button').simulate('click');
    expect(handler).toHaveBeenCalledWith(
      suggestion.name,
      suggestion.address,
      instance.state.selectedCuisine,
      instance.state.selectedPriceRange,
      instance.state.selectedPhoto,
      instance.props.fileUploader
    );
  })

  it('sets state when cuisineHandleChanged is called with new cuisine type id ', () => {
    const component = shallow(<RestaurantNewFormComponent/>);
    let instance = component.instance()
    instance.cuisineHandleChanged(10)
    expect(instance.state.selectedCuisine).toBe(10);
  })

  it('sets state when priceRangeHandleChanged is called with new cuisine type id ', () => {
    const component = shallow(<RestaurantNewFormComponent/>);
    let instance = component.instance()
    instance.priceRangeHandleChanged('¥0~999')
    expect(instance.state.selectedPriceRange).toBe('¥0~999');
  })

  it('it sets file in state when input is changed ', () => {
    const component = shallow(<RestaurantNewFormComponent/>);
    let file = {name: "myfile.txt"};
    let e = {
      target: {
        value: "C:\fakepath\myfile.txt",
        files: [file]
      }
    }
    component.find('input').simulate('change', e);
    let instance = component.instance()
    expect(instance.state.selectedPhoto).toBe(file);
  })
})
