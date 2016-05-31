import expect from 'expect';
import { mount, shallow } from 'enzyme';
import React from 'react';
import RestaurantNewComponent from '../src/js/RestaurantNewComponent';
import RestaurantSuggestionComponent from '../src/js/RestaurantSuggestionComponent';
import CuisineTypeSelectionComponent from '../src/js/CuisineTypeSelectionComponent';
import PriceRangeSelectionComponent from '../src/js/PriceRangeSelectionComponent';

describe('RestaurantNewComponent', () => {
  it('displays find restaurant label and input field when no suggestion has been selected', () => {
    const component = shallow(<RestaurantNewComponent />);
    expect(component.contains(<h1>find a restaurant</h1>)).toBe(true);
    expect(component.contains(<input ref=""/>)).toBe(true);
    expect(component.find('button').length).toBe(1);
  });

  it('displays new restaurant label and restaurant details when a restaurant has been selected', () => {
    let suggestion = {name: 'Afuri', address: 'Roppongi'};
    const component = shallow(<RestaurantNewComponent suggestion={suggestion}/>);
    expect(component.contains(<h1>add a restaurant</h1>)).toBe(true);
    expect(component.contains(<div>{suggestion.name}</div>)).toBe(true);
    expect(component.contains(<div>{suggestion.address}</div>)).toBe(true);
    expect(component.find('button').length).toBe(0);
  });

  it('calls onClick handler with input value when clicked', () => {
    const handler = expect.createSpy();
    const component = mount(<RestaurantNewComponent fetchSuggestions={handler} fetchCuisineTypes={()=>{}} fetchPriceRanges={()=>{}}/>);
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
      <RestaurantSuggestionComponent key="Afuri"
                                     suggestion={suggestions[0]}
                                     selectSuggestion={undefined}/>
    )).toBe(true);
    expect(component.contains(
      <RestaurantSuggestionComponent key="Butagumi"
                                     suggestion={suggestions[1]}
                                     selectSuggestion={undefined}/>
    )).toBe(true);
  })

  it('shows cuisine type dropdown', () => {
    let cuisineTypes = [
      {id: 0, name: 'Not Specified'},
      {id: 1, name: 'Japanese'},
      {id: 2, name: 'French'}
    ]
    const component = shallow(<RestaurantNewComponent cuisineTypes={cuisineTypes}/>);
    expect(component.contains(
      <CuisineTypeSelectionComponent cuisineTypes={cuisineTypes}/>
    )).toBe(true);
  })

  it('calls fetchCuisineTypes in componentDidMount', () => {
    let props = {
      fetchCuisineTypes: expect.createSpy(),
      fetchPriceRanges: ()=>{}
    };
    mount(<RestaurantNewComponent {...props} />);
    expect(props.fetchCuisineTypes.calls.length).toBe(1);
  });

  it('shows price range dropdown', () => {
    let priceRanges = [
      {id: 0, range: 'Not Specified'},
      {id: 1, range: '¥0~999'},
      {id: 2, range: '¥1000~1999'}
    ];
    const component = shallow(<RestaurantNewComponent priceRanges={priceRanges}/>);
    expect(component.contains(
      <PriceRangeSelectionComponent priceRanges={priceRanges}/>
    )).toBe(true);
  });

  it('calls fetchPriceRanges in componentDidMount', () => {
    let props = {
      fetchCuisineTypes: ()=>{},
      fetchPriceRanges: expect.createSpy()
    };
    mount(<RestaurantNewComponent {...props} />);
    expect(props.fetchPriceRanges.calls.length).toBe(1);
  });
});
