import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import PhotoPicker from '../../src/js/new_restaurant/PhotoPicker'
import List from '../../src/js/shared_components/List'
import CustomFileInput from '../../src/js/shared_components/CustomFileInput'

describe('PhotoPicker', () => {
  const selectedPhotos = [{name: "file1.txt"}, {name: "file2.txt"}]
  const selectPhotos = expect.createSpy()
  const props = {
    selectedPhotos: selectedPhotos,
    selectPhotos: selectPhotos
  }

  it('renders List with passed in files', () => {
    const component = shallow(<PhotoPicker {...props}/>)

    expect(component.contains(<List items={["file1.txt", "file2.txt"]}/>)).toBe(true)
  })

  it('call selectPhotos callback when files are selected', () => {
    const component = shallow(<PhotoPicker {...props}/>)

    expect(component.contains(
      <CustomFileInput selectPhotos={props.selectPhotos} />
    )).toBe(true)
  })
})
