import expect from 'expect';
import { mount, shallow } from 'enzyme';
import React from 'react';
import RestaurantNewComponent from '../src/js/RestaurantNewComponent';
import RestaurantSuggestionComponent from '../src/js/RestaurantSuggestionComponent';

describe('RestaurantNewComponent', () => {
  it('displays find restaurant label and input field', () => {
    const component = shallow(<RestaurantNewComponent />);
    expect(component.contains(<h1>find a restaurant</h1>)).toBe(true);
    expect(component.contains(<input ref=""/>)).toBe(true);
    expect(component.find('button').length).toBe(1);
  });

  it('calls onClick handler with input value when clicked', () => {
    const handler = expect.createSpy();
    const component = mount(<RestaurantNewComponent fetchSuggestions={handler}/>);
    const input = component.find('input').get(0);
    input.value = 'AFURI';
    component.find('button').simulate('click');
    expect(handler).toHaveBeenCalledWith('AFURI');
  });

  it('shows suggestions when receives suggestions as props', () => {
    let suggestions = [
      {name: 'Afuri', address: 'Roppongi'},
      {name: 'Butagumi', address: 'Near The Station'}
    ];
    const component = shallow(<RestaurantNewComponent suggestions={suggestions}/>);
    expect(component.contains(
      <RestaurantSuggestionComponent key="Afuri" suggestion={suggestions[0]}/>
    )).toBe(true);
    expect(component.contains(
      <RestaurantSuggestionComponent key="Butagumi" suggestion={suggestions[1]}/>
    )).toBe(true);
  })
});
