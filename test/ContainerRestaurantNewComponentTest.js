import expect from 'expect';
import { fetchSuggestions } from '../src/js/Actions'

import React from 'react';
import {mapStateToProps, mapDispatchToProps} from '../src/js/ContainerRestaurantNewComponent';

describe('ContainerRestaurantNewComponent', () => {
  it('mapsStateToProps', () => {
    let suggestions = [
      {name: 'Afuri', address: 'Roppongi'}
    ];
    let state = {
      suggestions: suggestions
    };

    expect(mapStateToProps(state).suggestions).toEqual(suggestions);
  });

  it('mapsDispatchToProps', () => {
    let dispatch = expect.createSpy();
    mapDispatchToProps(dispatch).fetchSuggestions('Afuri');
    expect(dispatch).toHaveBeenCalledWith(fetchSuggestions('Afuri'));
  });
});
