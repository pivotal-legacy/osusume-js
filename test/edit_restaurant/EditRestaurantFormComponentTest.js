import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'
import EditRestaurantFormComponent from '../../src/js/edit_restaurant/EditRestaurantFormComponent'
import CuisineTypeSelectionComponent from '../../src/js/new_restaurant/CuisineTypeSelectionComponent'
import PriceRangeSelectionComponent from '../../src/js/new_restaurant/PriceRangeSelectionComponent'

describe('EditRestaurantFormComponent', () => {
  it('displays restaurant information', () => {
    const restaurant = fromJS({
      name: 'Afuri',
      address: '〒150-0013 Tokyo, Shibuya, Ebisu, 1−1-7',
      notes: 'it is so delicious',
      cuisine: {
        id: 1
      },
      price_range: {
        id: 1
      }
    })

    const component = shallow(<EditRestaurantFormComponent restaurant={restaurant} />)

    expect(component.find('h2').text()).toEqual('Afuri')
    expect(component.find('.address').text()).toEqual('〒150-0013 Tokyo, Shibuya, Ebisu, 1−1-7')
    expect(component.find('textarea').props().defaultValue).toEqual('it is so delicious')

    const cuisineTypeSelector = component.find(CuisineTypeSelectionComponent)
    expect(cuisineTypeSelector.props().selectedCuisine).toEqual(1)

    const priceRangeSelectionComponent = component.find(PriceRangeSelectionComponent)
    expect(priceRangeSelectionComponent.props().selectedPriceRange).toEqual(1)
  })
})