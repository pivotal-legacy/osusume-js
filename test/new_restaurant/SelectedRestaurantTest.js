import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import SelectedRestaurant from '../../src/js/new_restaurant/SelectedRestaurant'

describe('SelectedRestaurant', () => {
  it('clicking edit button calls callback handler', () => {
    let props = {
      editRestaurantClicked: expect.createSpy(),
      suggestion: {name: 'Afuri', address: 'Roppongi'}
    }
    let component = shallow(<SelectedRestaurant {...props}/>)
    component.find('button').simulate('click')

    expect(props.editRestaurantClicked.calls.length).toBe(1)
  })
})
