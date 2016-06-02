import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import PriceRangeSelectionComponent from '../src/js/PriceRangeSelectionComponent'

describe('PriceRangeSelectionComponent', () => {
  let priceRanges = [
    {id: 0, range: 'Not Specified'},
    {id: 1, range: '¥0~999'},
    {id: 2, range: '¥1000~1999'}
  ];

  it('displays selection dropdown', () => {
    const component = shallow(<PriceRangeSelectionComponent priceRanges={priceRanges}/>);

    expect(component.find('select').length).toBe(1);
    expect(component.contains(<option value={0}>Not Specified</option>)).toEqual(true);
    expect(component.contains(<option value={1}>¥0~999</option>)).toBe(true);
    expect(component.contains(<option value={2}>¥1000~1999</option>)).toBe(true);
  });

  it('calls changeHandler with selected price range on change', () => {
    const handler = expect.createSpy();
    const component = shallow(<PriceRangeSelectionComponent
      priceRanges={priceRanges}
      changeHandler={handler}
    />);
    let e = {target: {options: {selectedIndex: 1, 1: {value: 1}}}}
    component.find('select').simulate('change', e);
    expect(handler).toHaveBeenCalledWith(1)
  })
});
