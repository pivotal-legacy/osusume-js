import React from 'react';
import expect from 'expect';
import * as actions from '../../src/js/Actions'
import {mapStateToProps, mapDispatchToProps} from '../../src/js/new_restaurant/ContainerRestaurantNewComponent';

describe('ContainerRestaurantNewComponent', () => {
  afterEach(function () {
    expect.restoreSpies()
  })

  it('mapsStateToProps', () => {
    let suggestions = [
      {name: 'Afuri', address: 'Roppongi'},
      {name: 'Butagumi', address: 'Roppongi'}
    ];
    let state = {
      suggestions: suggestions
    };

    expect(mapStateToProps(state).suggestions).toEqual(suggestions);
  });

  it('mapsDispatchToProps fetchSuggestions', () => {
    let dispatch = expect.createSpy();
    var spy = expect.spyOn(actions, 'fetchSuggestions')
    mapDispatchToProps(dispatch).fetchSuggestions('Afuri');
    expect(spy).toHaveBeenCalledWith('Afuri')
    expect(dispatch).toHaveBeenCalledWith(actions.fetchSuggestions())
  });
});
