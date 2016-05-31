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
    let suggestion = {name: 'Butagumi', address: 'Roppongi'};
    let cuisineTypes = [
      {id: 0, name: 'Not Specified'},
      {id: 1, name: 'Japanese'},
      {id: 2, name: 'French'}
    ];
    let priceRanges = [
      {id: 0, range: 'Not Specified'},
      {id: 1, range: '¥0~999'},
      {id: 2, range: '¥1000~1999'}
    ];
    let state = {
      suggestions: suggestions,
      suggestion: suggestion,
      cuisineTypes: cuisineTypes,
      priceRanges: priceRanges
    };

    expect(mapStateToProps(state).suggestions).toEqual(suggestions);
    expect(mapStateToProps(state).suggestion).toEqual(suggestion);
    expect(mapStateToProps(state).cuisineTypes).toEqual(cuisineTypes);
    expect(mapStateToProps(state).priceRanges).toEqual(priceRanges);
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

  it('mapsDispatchToProps fetchPriceRanges', () => {
    let dispatch = expect.createSpy();
    mapDispatchToProps(dispatch).fetchPriceRanges();
    expect(dispatch).toHaveBeenCalledWith(fetchPriceRanges());
  });
});
