import React from 'react';
import expect from 'expect';
import {fetchSuggestions, selectSuggestion, fetchPriceRanges} from '../src/js/Actions'
import {mapStateToProps, mapDispatchToProps} from '../src/js/ContainerRestaurantNewComponent';

describe('ContainerRestaurantNewComponent', () => {
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
    mapDispatchToProps(dispatch).fetchSuggestions('Afuri');
    expect(dispatch).toHaveBeenCalledWith(fetchSuggestions('Afuri'));
  });
});
