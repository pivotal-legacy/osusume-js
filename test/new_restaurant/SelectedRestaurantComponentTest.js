import expect from 'expect'
import { mount, shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'
import SelectedRestaurantComponent from '../../src/js/new_restaurant/SelectedRestaurantComponent'

describe('SelectedRestaurantComponent', () => {
  it('clicking edit button calls callback handler', () => {
    let props = {
      editRestaurantClicked: expect.createSpy(),
      suggestion: fromJS({name: 'Afuri', address: 'Roppongi'})
    }
    let component = shallow(<SelectedRestaurantComponent {...props}/>)
    component.find('button').simulate('click')

    expect(props.editRestaurantClicked.calls.length).toBe(1)
  })
})
