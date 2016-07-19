import React from 'react'
import {shallow} from 'enzyme'
import expect from 'expect'

import CustomFileInput from '../../src/js/shared_components/CustomFileInput'

describe('CustomFileInput', () => {
  it('calls the onChange callback with just files from the event', () => {
    const props = {
      selectPhotos: expect.createSpy()
    }
    const component = shallow(<CustomFileInput {...props} />)

    const photoFiles = [{name: "myfile.txt"}, {name: "newfile.txt"}]
    const changeEvent = {
      target: {
        files: photoFiles
      }
    }
    component.find('input').simulate('change', changeEvent)

    expect(props.selectPhotos).toHaveBeenCalledWith(photoFiles)
  })
})
