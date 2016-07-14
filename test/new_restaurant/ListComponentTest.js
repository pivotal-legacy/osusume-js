import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import ListComponent from '../../src/js/new_restaurant/ListComponent'

describe('ListComponent', () => {
  it('displays the items passed in props', () => {
    let items = ["item1", "item2"]
    const component = shallow(<ListComponent items={items} />)

    expect(component.contains(<div key={0}>item1</div>)).toBe(true)
    expect(component.contains(<div key={1}>item2</div>)).toBe(true)
  })
})
