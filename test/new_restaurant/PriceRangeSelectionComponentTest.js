import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import {fromJS} from 'immutable'
import PriceRangeSelectionComponent from '../../src/js/new_restaurant/PriceRangeSelectionComponent'
import PriceRangeOptionComponent from '../../src/js/new_restaurant/PriceRangeOptionComponent'

describe('PriceRangeSelectionComponent', () => {
  let priceRanges = fromJS([
    {id: 0, range: 'Not Specified'},
    {id: 1, range: '¥0~999'},
    {id: 2, range: '¥1000~1999'}
  ])

  it('displays selection dropdown', () => {
    const component = shallow(<PriceRangeSelectionComponent priceRanges={priceRanges}/>)

    expect(component.find('select').length).toBe(1)
    expect(component.contains(<PriceRangeOptionComponent priceRange={priceRanges.get(0)}/>)).toEqual(true)
    expect(component.contains(<PriceRangeOptionComponent priceRange={priceRanges.get(1)}/>)).toEqual(true)
    expect(component.contains(<PriceRangeOptionComponent priceRange={priceRanges.get(2)}/>)).toEqual(true)
  })

  it('calls changeHandler with selected price range on change', () => {
    const handler = expect.createSpy()
    const component = shallow(<PriceRangeSelectionComponent
      priceRanges={priceRanges}
      changeHandler={handler}
    />)
    let e = {target: {options: {selectedIndex: 1, 1: {value: 1}}}}
    component.find('select').simulate('change', e)
    expect(handler).toHaveBeenCalledWith(1)
  })

  it('selects passed in price range by default', () => {
    const props = {
      priceRanges: priceRanges,
      selectedPriceRange: 1
    }

    const component = shallow(<PriceRangeSelectionComponent {...props} />)

    expect(component.find('select').props().defaultValue).toEqual(1)
  })
})
