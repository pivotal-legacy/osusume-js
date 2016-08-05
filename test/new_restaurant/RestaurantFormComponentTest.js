import { shallow } from 'enzyme'
import expect from 'expect'
import React from 'react'
import RestaurantFormComponent from '../../src/js/new_restaurant/RestaurantFormComponent'
import CuisineTypeSelectionComponent from '../../src/js/new_restaurant/CuisineTypeSelectionComponent'
import PriceRangeSelectionComponent from '../../src/js/new_restaurant/PriceRangeSelectionComponent'
import PhotoPickerComponent from '../../src/js/new_restaurant/PhotoPickerComponent'
import SelectedRestaurantComponent from '../../src/js/new_restaurant/SelectedRestaurantComponent'

describe('RestaurantFormComponent', () => {
  const suggestion = {
    name: 'Afuri',
    address: 'Roppongi',
    place_id: 'some place id',
    latitude: '1.23',
    longitude: '2.34'
  }

  const cuisineTypes = [
    {id: 0, name: 'Not Specified'},
    {id: 1, name: 'Japanese'}
  ]

  const priceRanges = [
    {id: 0, range: 'Not Specified'},
    {id: 1, range: '¥0~999'}
  ]

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
    expect(component.contains(<PhotoPickerComponent selectedPhotos={[]} selectPhotos={instance.selectPhotos} />)).toBe(true)
    expect(component.contains(<textarea className="notes" onChange={instance.noteChanged}></textarea>)).toBe(true)
  })

  it('calls fetchCuisinetypes in componentDidMount', () => {
    const modifiedProps = Object.assign({}, props, {
      fetchCuisineTypes: expect.createSpy()
    })
    const component = shallow(<RestaurantFormComponent {...modifiedProps} />)
    component.instance().componentDidMount()

    expect(modifiedProps.fetchCuisineTypes.calls.length).toBe(1)
  })

  it('calls fetchPriceRanges in componentDidMount', () => {
    const modifiedProps = Object.assign({}, props, {
      fetchPriceRanges: expect.createSpy()
    })
    const component = shallow(<RestaurantFormComponent {...modifiedProps} />)
    component.instance().componentDidMount()

    expect(modifiedProps.fetchPriceRanges.calls.length).toBe(1)
  })

  it('calls onSubmit handler with new restaurant data when "save" is clicked', () => {
    const component = shallow(<RestaurantFormComponent {...props} />)
    const instance = component.instance()
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
        notes: instance.state.notes
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

  it('selectPhotos() accepts a FileList and adds those files to existing files in state', () => {
    const component = shallow(<RestaurantFormComponent {...props} />)
    const instance = component.instance()
    instance.state.selectedPhotos = [{name: "myfile.txt"}]

    var anotherFileIterable = {
      [Symbol.iterator]() {
        return {
          i: 0,
          next() {
            if (this.i < 1) {
              this.i++
              return {value: {name: "anotherfile.txt"}, done: false}
            }
            return { value: undefined, done: true };
          }
        };
      }
    }

    instance.selectPhotos(anotherFileIterable)

    const expectedPhotoFiles = [{name: "myfile.txt"}, {name: "anotherfile.txt"}]
    expect(instance.state.selectedPhotos).toEqual(expectedPhotoFiles)
  })

  it('does not show the name and address if there is no suggestion', () => {
    const modifiedProps = Object.assign({}, props, {
      suggestion: null
    })
    const component = shallow(<RestaurantFormComponent {...modifiedProps} />)

    expect(component.find(SelectedRestaurantComponent).length).toEqual(0)
  })

  it('does not allow save button to be enabled when there is no suggestion', () => {
    const modifiedProps = Object.assign({}, props, {
      suggestion: null
    })

    const component = shallow(<RestaurantFormComponent {...modifiedProps} />)

    expect(component.find('.save-restaurant').props().disabled).toBe(true)
  })

  it('does show the name and address if there is a suggestion', () => {
    const component = shallow(<RestaurantFormComponent {...props} />)

    expect(component.contains(<SelectedRestaurantComponent
      editRestaurantClicked={props.findRestaurantClicked}
      suggestion={props.suggestion}/>)
    ).toBe(true)
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

  it('sets the entered notes in the state when notes are entered', () => {
    const component = shallow(<RestaurantFormComponent {...props} />)

    component.instance().noteChanged({target: {value: '美味しいです'}})

    expect(component.instance().state.notes).toEqual('美味しいです')
  })
})
