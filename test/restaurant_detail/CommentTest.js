import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'

import Comment from '../../src/js/restaurant_detail/Comment'

describe('Comment', () => {
  it('displays the comment passed in props', () => {
    let comment = {
      comment: 'I love it',
      created_at: "2016-06-09T07:21:52.211Z",
      id: 1,
      user: {
        name: 'Danny'
      }
    }
    let component = shallow(<Comment comment={comment} />)
    expect(component.contains(<span className="left">Danny</span>)).toBe(true)
    expect(component.contains(<span className="right">6/9/2016</span>)).toBe(true)
    expect(component.contains(<div>I love it</div>)).toBe(true)
  })
})
