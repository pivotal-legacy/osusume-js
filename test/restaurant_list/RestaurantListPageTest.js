import expect from 'expect'
import { mount, shallow } from 'enzyme'

import { Link } from 'react-router'
import React from 'react'
import RestaurantListPage from '../../src/js/restaurant_list/RestaurantListPage'
import RestaurantListItem from '../../src/js/restaurant_list/RestaurantListItem'
import Grid from '../../src/js/shared_components/Grid'

describe('RestaurantListPage', () => {
  it('displays restaurants in grid with four columns per row', () => {
    let restaurants = [
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Tsukemen'}
    ]

    const component = shallow(<RestaurantListPage restaurants={restaurants} />)

    let restaurantItems = restaurants.map((restaurant) => {
      return (<RestaurantListItem key={restaurant.id} restaurant={restaurant} />)
    })

    expect(component.contains(<Grid items={restaurantItems} numColumns={4} />)).toBe(true)
  })

  it('display add restaurant and my page buttons above the restaurant list', () => {
    const component = shallow(<RestaurantListPage restaurants={[]} />)
    expect(component.contains(<Link to="/restaurants/new"><button>add restaurant</button></Link>)).toBe(true)
    expect(component.contains(<Link to="/my_page"><button className='my-page-link'>my page</button></Link>)).toBe(true)
  })

  it('calls fetchRestaurants in the componentDidMount', () => {
    let props = {
      fetchRestaurants: expect.createSpy(),
      restaurants: []
    }
    expect(props.fetchRestaurants.calls.length).toBe(0)
    mount(<RestaurantListPage {...props} />)
    expect(props.fetchRestaurants.calls.length).toBe(1)
  })
})
