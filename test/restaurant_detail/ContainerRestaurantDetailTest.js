import expect from 'expect'
import React from 'react'

import {mapStateToProps, mapDispatchToProps} from '../../src/js/restaurant_detail/ContainerRestaurantDetailPage'
import * as restaurantActions from '../../src/js/actions/RestaurantActions'
import * as commentActions from '../../src/js/actions/CommentActions'

describe('ContainerRestaurantDetail', () => {
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
      currentRestaurant: {id: 17, name: 'Afuri'},
      comments: [{id: 0, comment: 'i like this one'}],
      currentUser: {id: 0, name: 'Danny'}
    }

    expect(mapStateToProps(state, props).restaurant).toEqual({id: 17, name: 'Afuri'})
    expect(mapStateToProps(state, props).comments).toEqual([{id: 0, comment: 'i like this one'}])
    expect(mapStateToProps(state, props).currentUser).toEqual({id: 0, name: 'Danny'})
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
