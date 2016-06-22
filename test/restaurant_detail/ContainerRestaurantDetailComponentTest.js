import expect from 'expect'
import { createStore } from 'redux'
import { mount, shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'

import {mapStateToProps, mapDispatchToProps} from '../../src/js/restaurant_detail/ContainerRestaurantDetailComponent'
import * as actions from '../../src/js/actions/Actions'
import * as restaurantActions from '../../src/js/actions/RestaurantActions'
import * as commentActions from '../../src/js/actions/CommentActions'

describe('ContainerRestaurantDetailComponent', () => {
  afterEach(function () {
    expect.restoreSpies()
  })

  it('mapsStateToProps', () => {
    let state = {
      restaurants: fromJS([{id: 0, name: 'Afuri'}, {id: 1, name: 'Tsukemen'}]),
      comments: [{id: 0, comment: 'i like this one'}]
    }

    expect(mapStateToProps(state, {params: {restaurantId: 0}}).restaurant).toEqual(fromJS({id: 0, name: 'Afuri'}))
    expect(mapStateToProps(state, {params: {restaurantId: 0}}).comments).toEqual([{id: 0, comment: 'i like this one'}])
  })

  it('mapsDispatchToProps for fetchComments', () => {
    let dispatch = expect.createSpy()
    let props = {
      params: {
        restaurantId: 17
      }
    }
    var spy = expect.spyOn(commentActions, 'fetchComments')
    mapDispatchToProps(dispatch, props).fetchComments(17)
    expect(spy).toHaveBeenCalledWith(17)
    expect(dispatch).toHaveBeenCalledWith(commentActions.fetchComments())
  })

  it('mapsDispatchToProps for fetchRestaurant', () => {
    let dispatch = expect.createSpy()
    let props = {
      params: {
        restaurantId: 17
      }
    }
    var spy = expect.spyOn(restaurantActions, 'fetchRestaurant')
    mapDispatchToProps(dispatch, props).fetchRestaurant(17)
    expect(spy).toHaveBeenCalledWith(17)
    expect(dispatch).toHaveBeenCalledWith(restaurantActions.fetchRestaurant())
  })

  it('mapsDispatchToProps for createComment', () => {
      let dispatch = expect.createSpy()
      let props = {
        params: {
          restaurantId: 17
        }
      }
      var spy = expect.spyOn(commentActions, 'createComment')
      mapDispatchToProps(dispatch, props).createComment('it is a comment')
      expect(spy).toHaveBeenCalledWith(17, 'it is a comment')
      expect(dispatch).toHaveBeenCalledWith(commentActions.createComment())
  })

  it('mapsDispatchToProps for like', () => {
    let dispatch = expect.createSpy()
    let props = {
      params: {
        restaurantId: 17
      }
    }
    var spy = expect.spyOn(restaurantActions, 'like')
    mapDispatchToProps(dispatch, props).like()
    expect(spy).toHaveBeenCalledWith(17)
    expect(dispatch).toHaveBeenCalledWith(restaurantActions.like())
  })

  it('mapsDispatchToProps for removeLike', () => {
    let dispatch = expect.createSpy()
    let props = {
      params: {
        restaurantId: 17
      }
    }
    var spy = expect.spyOn(restaurantActions, 'removeLike')
    mapDispatchToProps(dispatch, props).removeLike()
    expect(spy).toHaveBeenCalledWith(17)
    expect(dispatch).toHaveBeenCalledWith(restaurantActions.removeLike())
  })
})
