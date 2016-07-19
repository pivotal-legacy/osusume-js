import expect from 'expect'
import { shallow, mount } from 'enzyme'
import React from 'react'
import PhotoPickerComponent from '../../src/js/new_restaurant/PhotoPickerComponent'
import ListComponent from '../../src/js/shared_components/ListComponent'
import CustomFileInput from '../../src/js/shared_components/CustomFileInput'

describe('PhotoPickerComponent', () => {
  const selectedPhotos = [{name: "file1.txt"}, {name: "file2.txt"}]
  const selectPhotos = expect.createSpy()
  const props = {
    selectedPhotos: selectedPhotos,
    selectPhotos: selectPhotos
  }

  it('renders ListComponent with passed in files', () => {
    const component = shallow(<PhotoPickerComponent {...props}/>)

    expect(component.contains(<ListComponent items={["file1.txt", "file2.txt"]}/>)).toBe(true)
  })

  it('call selectPhotos callback when files are selected', () => {
    const component = shallow(<PhotoPickerComponent {...props}/>)

    expect(component.contains(
      <CustomFileInput selectPhotos={props.selectPhotos} />
    )).toBe(true)
  })
})
