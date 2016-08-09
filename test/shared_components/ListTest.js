import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import List from '../../src/js/shared_components/List'

describe('List', () => {
  it('displays the items passed in props', () => {
    let items = ["item1", "item2"]
    const component = shallow(<List items={items} />)

    expect(component.contains(<div key={0}>item1</div>)).toBe(true)
    expect(component.contains(<div key={1}>item2</div>)).toBe(true)
  })
})
