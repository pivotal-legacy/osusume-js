import expect from 'expect';
import { createStore } from 'redux';
import { mount, shallow } from 'enzyme';
import React from 'react';

import {mapStateToProps, mapDispatchToProps} from '../../src/js/restaurant_detail/ContainerRestaurantDetailComponent';
import * as actions from '../../src/js/Actions'

describe('ContainerRestaurantDetailComponent', () => {
  afterEach(function () {
    expect.restoreSpies()
  })

  it('mapsStateToProps', () => {
    let state = {
      restaurants: [{id: 0, name: 'Afuri'}, {id: 1, name: 'Tsukemen'}]
    };

    expect(mapStateToProps(state, {params: {restaurantId: 0}}).restaurant).toEqual({id: 0, name: 'Afuri'});
  });

  it('mapsDispatchToProps', () => {
    let dispatch = expect.createSpy();
    let props = {
      params: {
        restaurantId: 17
      }
    }
    var spy = expect.spyOn(actions, 'fetchRestaurant')
    mapDispatchToProps(dispatch, props).fetchRestaurant();
    expect(spy).toHaveBeenCalledWith(17)
    expect(dispatch).toHaveBeenCalledWith(actions.fetchRestaurant());
  });
});
