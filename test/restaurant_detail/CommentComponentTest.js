import expect from 'expect'
import { mount, shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'

import CommentComponent from '../../src/js/restaurant_detail/CommentComponent'

describe('CommentComponent', () => {
  it('displays the comment passed in props', () => {
    let comment = fromJS({
      comment: 'I love it',
      created_at: "2016-06-09T07:21:52.211Z",
      id: 1,
      user: {
        name: 'Danny'
      }
    })
    let component = shallow(<CommentComponent comment={comment} />)
    expect(component.contains(<div>I love it</div>)).toBe(true)
    expect(component.contains(<div>6/9/2016</div>)).toBe(true)
    expect(component.contains(<div>Danny</div>)).toBe(true)
  })
})
