import expect from 'expect'
import { shallow, mount } from 'enzyme'
import React from 'react'
import CommentFormComponent from '../../src/js/restaurant_detail/CommentFormComponent'

describe('CommentFormComponent', () => {
  it('displays textarea and button', () => {
    const component = shallow(<CommentFormComponent />)
    expect(component.find('textarea').length).toBe(1)
    expect(component.find('button').length).toBe(1)
  })

  it('calls click handler with input value when button is clicked', () => {
    const handler = expect.createSpy()
    const component = mount(<CommentFormComponent createComment={handler} />)
    const input = component.find('textarea')
    input.get(0).value = 'i like ramen'
    input.simulate('change')
    component.find('button').simulate('click')
    expect(handler).toHaveBeenCalledWith('i like ramen')
  })

  it('clears the textarea after the button is clicked', () => {
    const handler = expect.createSpy()
    const component = mount(<CommentFormComponent createComment={handler} />)
    const input = component.find('textarea')
    input.get(0).value = 'i like ramen'
    input.simulate('change')
    component.find('button').simulate('click')
    expect(input.get(0).value).toEqual('')
  })
})
