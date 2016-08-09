import { shallow, mount } from 'enzyme'
import expect from 'expect'
import React from 'react'
import LoginPage from '../../src/js/login/LoginPage'

describe('LoginPage', () => {
  it('calls login handler with email and password when "log in" is clicked', () => {
    const handler = expect.createSpy()
    const component = mount(<LoginPage login={handler}/>)
    let instance = component.instance()
    component.find('.email').get(0).value = 'danny@pivotal.io'
    component.find('.password').get(0).value = 'password'
    component.find('button').simulate('click')
    expect(handler).toHaveBeenCalledWith(
      'danny@pivotal.io', 'password'
    )
  })
})
