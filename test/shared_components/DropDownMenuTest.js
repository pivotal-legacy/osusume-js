import expect from 'expect'
import React from 'react'
import { mount } from 'enzyme'
import DropDownMenu from '../../src/js/shared_components/DropDownMenu'

describe('DropDownMenu', () => {
  let options = [
    {value: '0', label: 'Cat'},
    {value: '1', label: 'Dog'}
  ]

  it('displays a dropdown menu', () => {
    const component = mount(<DropDownMenu options={options} />)

    expect(component.contains(<option key='0' value='0'>Cat</option>)).toEqual(true)
    expect(component.contains(<option key='1' value='1'>Dog</option>)).toEqual(true)
  })

  it('selects passed in option by default', () => {
    const component = mount(<DropDownMenu options={options} defaultValue='1' />)

    expect(component.find('select').node.value).toEqual(1)
  })

  it('returns the selected value', () => {
    const component = mount(<DropDownMenu options={options} />)

    component.find('select').simulate('change', { target: { value: '1' } })

    expect(component.node.getValue()).toEqual('1')
  })
})
