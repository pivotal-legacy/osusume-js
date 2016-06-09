import { shallow, mount } from 'enzyme'
import expect from 'expect'
import React from 'react'
import LoginComponent from '../../src/js/login/LoginComponent'

describe('LoginComponent', () => {
  it('calls login handler with email and password when "log in" is clicked', () => {
    const handler = expect.createSpy()
    const component = mount(<LoginComponent login={handler}/>)
    let instance = component.instance()
    component.find('.email').get(0).value = 'danny@pivotal.io'
    component.find('.password').get(0).value = 'password'
    component.find('button').simulate('click')
    expect(handler).toHaveBeenCalledWith(
      'danny@pivotal.io', 'password'
    )
  })
})
