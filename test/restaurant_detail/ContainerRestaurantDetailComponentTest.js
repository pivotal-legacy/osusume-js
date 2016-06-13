import expect from 'expect'
import { createStore } from 'redux'
import { mount, shallow } from 'enzyme'
import React from 'react'

import {mapStateToProps, mapDispatchToProps} from '../../src/js/restaurant_detail/ContainerRestaurantDetailComponent';
import * as actions from '../../src/js/actions/Actions'
import * as restaurantActions from '../../src/js/actions/RestaurantActions'

describe('ContainerRestaurantDetailComponent', () => {
  afterEach(function () {
    expect.restoreSpies()
  })

  it('mapsStateToProps', () => {
    let state = {
      restaurants: [{id: 0, name: 'Afuri'}, {id: 1, name: 'Tsukemen'}],
      comments: [{id: 0, comment: 'i like this one'}]
    };

    expect(mapStateToProps(state, {params: {restaurantId: 0}}).restaurant).toEqual({id: 0, name: 'Afuri'})
    expect(mapStateToProps(state, {params: {restaurantId: 0}}).comments).toEqual([{id: 0, comment: 'i like this one'}])
  });

  it('mapsDispatchToProps for fetchComments', () => {
    let dispatch = expect.createSpy();
    let props = {
      params: {
        restaurantId: 17
      }
    }
    var spy = expect.spyOn(actions, 'fetchComments')
    mapDispatchToProps(dispatch, props).fetchComments(17);
    expect(spy).toHaveBeenCalledWith(17)
    expect(dispatch).toHaveBeenCalledWith(actions.fetchComments());
  });

  it('mapsDispatchToProps for fetchRestaurant', () => {
    let dispatch = expect.createSpy()
    let props = {
      params: {
        restaurantId: 17
      }
    }
    var spy = expect.spyOn(restaurantActions, 'fetchRestaurant')
    mapDispatchToProps(dispatch, props).fetchRestaurant(17);
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
      var spy = expect.spyOn(restaurantActions, 'createComment')
      mapDispatchToProps(dispatch, props).createComment('it is a comment')
      expect(spy).toHaveBeenCalledWith(17, 'it is a comment')
      expect(dispatch).toHaveBeenCalledWith(restaurantActions.createComment())
  })
})
