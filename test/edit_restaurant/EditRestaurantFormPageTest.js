import expect from 'expect'
import React from 'react'
import { shallow, mount } from 'enzyme'
import EditRestaurantFormPage from '../../src/js/edit_restaurant/EditRestaurantFormPage'
import CuisineTypeSelection from '../../src/js/new_restaurant/CuisineTypeSelection'
import PriceRangeSelection from '../../src/js/new_restaurant/PriceRangeSelection'

describe('EditRestaurantFormPage', () => {
  it('displays restaurant information', () => {
    const restaurant = {
      name: 'Afuri',
      address: '〒150-0013 Tokyo, Shibuya, Ebisu, 1−1-7',
      notes: 'it is so delicious',
      cuisine: {
        id: 1
      },
      price_range: {
        id: 1
      }
    }

    const component = shallow(<EditRestaurantFormPage restaurant={restaurant} />)

    expect(component.find('h2').text()).toEqual('Afuri')
    expect(component.find('.address').text()).toEqual('〒150-0013 Tokyo, Shibuya, Ebisu, 1−1-7')
    expect(component.find('textarea').props().defaultValue).toEqual('it is so delicious')

    const cuisineTypeSelector = component.find(CuisineTypeSelection)
    expect(cuisineTypeSelector.props().selectedCuisine).toEqual(1)

    const priceRangeSelectionComponent = component.find(PriceRangeSelection)
    expect(priceRangeSelectionComponent.props().selectedPriceRange).toEqual(1)
  })

  it('fetches the restaurant', () => {
    const props = {
      restaurant: {},
      fetchCuisineTypes: () => {},
      fetchPriceRanges: () => {},
      fetchRestaurant: expect.createSpy()
    }

    const component = mount(<EditRestaurantFormPage {...props} />)

    expect(props.fetchRestaurant).toHaveBeenCalled()
  })
})