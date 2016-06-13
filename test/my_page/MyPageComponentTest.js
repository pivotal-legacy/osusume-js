import expect from 'expect'
import { shallow } from 'enzyme'
import { Link } from 'react-router'

import React from 'react'
import MyPageComponent from '../../src/js/my_page/MyPageComponent'

describe('MyPageComponent', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('displays title and name of current user', () => {
    localStorage.setItem('userName', 'Danny')
    const component = shallow(<MyPageComponent />)

    expect(component.contains(<Link to="/"><button>restaurants</button></Link>)).toBe(true)
    expect(component.contains(<h1>my page</h1>)).toBe(true)
    expect(component.contains(<div>Danny</div>)).toBe(true)
  })
})
