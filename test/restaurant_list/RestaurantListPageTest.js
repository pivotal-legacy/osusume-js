import expect from 'expect'
import { mount, shallow } from 'enzyme'

import { Link } from 'react-router'
import React from 'react'
import RestaurantListPage from '../../src/js/restaurant_list/RestaurantListPage'
import RestaurantListItem from '../../src/js/restaurant_list/RestaurantListItem'

describe('RestaurantListPage', () => {
  it('displays the restaurants passed as props', () => {
    let restaurants = [
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Tsukemen'}
    ]
    const component = shallow(<RestaurantListPage restaurants={restaurants} />)

    expect(component.contains(<RestaurantListItem restaurant={{id: 0, name: 'Afuri'}}/>)).toBe(true)
    expect(component.contains(<RestaurantListItem restaurant={{id: 1, name: 'Tsukemen'}}/>)).toBe(true)
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
