import expect from 'expect'
import { createStore } from 'redux'
import { mount, shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'

import {mapDispatchToProps, mapStateToProps} from '../../src/js/my_page/ContainerMyPageComponent'
import * as actions from '../../src/js/actions/AuthenticationActions'
import * as restaurantActions from '../../src/js/actions/RestaurantActions'

describe('ContainerMyPageComponent', () => {
  it('mapsDispatchToProps for logout', () => {
    let dispatch = expect.createSpy()

    var spy = expect.spyOn(actions, 'logout')
    mapDispatchToProps(dispatch).logout()
    expect(spy).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(actions.logout())
  })

  it('mapDispatchToProps for fetchRestaurants', () => {
    let dispatch = expect.createSpy()

    var spy = expect.spyOn(restaurantActions, 'fetchRestaurants')
    mapDispatchToProps(dispatch).fetchRestaurants()
    expect(spy).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(restaurantActions.fetchRestaurants())
  })

  it('mapStateToProps for myRestaurants', () => {
    let state = {
      restaurants: fromJS([
        {id: 0, name: 'Afuri', user: {id: 17}},
        {id: 1, name: 'Butagumi', user: {id: 18}}
      ]),
      currentUser: fromJS({id: 17})
    }
    expect(mapStateToProps(state).myRestaurants).toEqual(
      fromJS([{id: 0, name: 'Afuri', user: {id: 17}}])
    )
  })

  it('mapStateToProps for myLikedRestaurants', () => {
    let state = {
      restaurants: fromJS([
        {id: 0, name: 'Afuri', liked: true, user: {id: 17}},
        {id: 1, name: 'Butagumi', liked: false, user: {id: 17}}
      ]),
      currentUser: fromJS({id: 17})
    }
    expect(mapStateToProps(state).myLikedRestaurants).toEqual(
      fromJS([{id: 0, name: 'Afuri', liked: true, user: {id: 17}}])
    )
  })

  it('mapStateToProps for currentUser', () => {
    let state = {
      restaurants: fromJS([]),
      currentUser: fromJS({id: 17})
    }
    expect(mapStateToProps(state).currentUser).toEqual(
      fromJS({id: 17})
    )
  })
})
