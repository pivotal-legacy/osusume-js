import expect from 'expect'
import { shallow, mount } from 'enzyme'
import React from 'react'
import CommentForm from '../../src/js/restaurant_detail/CommentForm'
import Input from 'pui-react-inputs'

describe('CommentForm', () => {
  it('sets comment property on state on onChange', () => {
    const handler = expect.createSpy()
    const component = shallow(<CommentForm createComment={handler} />)
    const changeEvent = {
      target: {
        value: 'i like ramen'
      }
    }
    component.find('Input').simulate('change', changeEvent)
    expect(component.instance().state.comment).toEqual('i like ramen')
  })

  it('calls onSubmit when comment form is submitted', () => {
    const handler = expect.createSpy()
    const component = shallow(<CommentForm createComment={handler} />)
    const changeEvent = {
      target: {
        value: 'i like ramen'
      }
    }
    const submitEvent = {
      preventDefault: () => {}
    }
    component.find('Input').simulate('change', changeEvent)
    component.find('form').simulate('submit', submitEvent)
    expect(handler).toHaveBeenCalledWith('i like ramen')
  })

  it('clears the textarea after the comment form is submitted', () => {
    const handler = expect.createSpy()
    const component = shallow(<CommentForm createComment={handler} />)
    const input = component.find('Input')
    const changeEvent = {
      target: {
        value: 'i like ramen'
      }
    }
    const submitEvent = {
      preventDefault: () => {}
    }
    input.simulate('change', changeEvent)
    component.find('form').simulate('submit', submitEvent)
    expect(input.get(0).props.value).toEqual('')
  })
})
