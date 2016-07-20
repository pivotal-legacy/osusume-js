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
  let dispatch, props

  beforeEach(function() {
    dispatch = expect.createSpy()
    props = {
      params: {
        restaurant_id: 17
      }
    }
  })
  afterEach(function () {
    expect.restoreSpies()
  })

  it('mapsStateToProps', () => {
    let state = {
      restaurants: fromJS([{id: 17, name: 'Afuri'}, {id: 1, name: 'Tsukemen'}]),
      comments: [{id: 0, comment: 'i like this one'}],
      currentUser: fromJS({id: 0, name: 'Danny'})
    }

    expect(mapStateToProps(state, props).restaurant).toEqual(fromJS({id: 17, name: 'Afuri'}))
    expect(mapStateToProps(state, props).comments).toEqual([{id: 0, comment: 'i like this one'}])
    expect(mapStateToProps(state, props).currentUser).toEqual(fromJS({id: 0, name: 'Danny'}))
  })

  it('mapsDispatchToProps for fetchComments', () => {
    var spy = expect.spyOn(commentActions, 'fetchComments')
    mapDispatchToProps(dispatch, props).fetchComments(17)
    expect(spy).toHaveBeenCalledWith(17)
    expect(dispatch).toHaveBeenCalledWith(commentActions.fetchComments())
  })

  it('mapsDispatchToProps for fetchRestaurant', () => {
    var spy = expect.spyOn(restaurantActions, 'fetchRestaurant')
    mapDispatchToProps(dispatch, props).fetchRestaurant(17)
    expect(spy).toHaveBeenCalledWith(17)
    expect(dispatch).toHaveBeenCalledWith(restaurantActions.fetchRestaurant())
  })

  it('mapsDispatchToProps for createComment', () => {
      var spy = expect.spyOn(commentActions, 'createComment')
      mapDispatchToProps(dispatch, props).createComment('it is a comment')
      expect(spy).toHaveBeenCalledWith(17, 'it is a comment')
      expect(dispatch).toHaveBeenCalledWith(commentActions.createComment())
  })

  it('mapsDispatchToProps for like', () => {
    var spy = expect.spyOn(restaurantActions, 'like')
    mapDispatchToProps(dispatch, props).like()
    expect(spy).toHaveBeenCalledWith(17)
    expect(dispatch).toHaveBeenCalledWith(restaurantActions.like())
  })

  it('mapsDispatchToProps for removeLike', () => {
    var spy = expect.spyOn(restaurantActions, 'removeLike')
    mapDispatchToProps(dispatch, props).removeLike()
    expect(spy).toHaveBeenCalledWith(17)
    expect(dispatch).toHaveBeenCalledWith(restaurantActions.removeLike())
  })

  it('mapsDispatchToProps for deleteRestaurant', () => {
    var spy = expect.spyOn(restaurantActions, 'deleteRestaurant')
    mapDispatchToProps(dispatch, props).deleteRestaurant()
    expect(spy).toHaveBeenCalledWith(17)
    expect(dispatch).toHaveBeenCalledWith(restaurantActions.deleteRestaurant())
  })
})
