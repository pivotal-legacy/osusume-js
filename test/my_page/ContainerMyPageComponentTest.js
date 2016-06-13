import expect from 'expect'
import { createStore } from 'redux'
import { mount, shallow } from 'enzyme'
import React from 'react'

import {mapDispatchToProps} from '../../src/js/my_page/ContainerMyPageComponent'
import * as actions from '../../src/js/actions/AuthenticationActions'

describe('ContainerMyPageComponent', () => {
  it('mapsDispatchToProps for logout', () => {
    let dispatch = expect.createSpy()

    var spy = expect.spyOn(actions, 'logout')
    mapDispatchToProps(dispatch).logout()
    expect(spy).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(actions.logout())
  })
})
