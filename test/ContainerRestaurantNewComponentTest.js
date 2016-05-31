import React from 'react';
import expect from 'expect';
import {fetchSuggestions, selectSuggestion} from '../src/js/Actions'
import {mapStateToProps, mapDispatchToProps} from '../src/js/ContainerRestaurantNewComponent';

describe('ContainerRestaurantNewComponent', () => {
  it('mapsStateToProps', () => {
    let suggestions = [
      {name: 'Afuri', address: 'Roppongi'},
      {name: 'Butagumi', address: 'Roppongi'}
    ];
    let suggestion = {name: 'Butagumi', address: 'Roppongi'};
    let cuisineTypes = [
      {id: 0, name: 'Not Specified'},
      {id: 1, name: 'Japanese'},
      {id: 2, name: 'French'}
    ];

    let state = {
      suggestions: suggestions,
      suggestion: suggestion,
      cuisineTypes: cuisineTypes
    };

    expect(mapStateToProps(state).suggestions).toEqual(suggestions);
    expect(mapStateToProps(state).suggestion).toEqual(suggestion);
    expect(mapStateToProps(state).cuisineTypes).toEqual(cuisineTypes);
  });

  it('mapsDispatchToProps fetchSuggestions', () => {
    let dispatch = expect.createSpy();
    mapDispatchToProps(dispatch).fetchSuggestions('Afuri');
    expect(dispatch).toHaveBeenCalledWith(fetchSuggestions('Afuri'));
  });

  it('mapsDispatchToProps selectSuggestion', () => {
    let dispatch = expect.createSpy();
    let suggestion = {name: 'Afuri', address: 'Roppongi'};
    mapDispatchToProps(dispatch).selectSuggestion(suggestion);
    expect(dispatch).toHaveBeenCalledWith(selectSuggestion(suggestion));
  });
});
