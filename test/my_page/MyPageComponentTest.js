import expect from 'expect'
import { shallow, mount } from 'enzyme'
import { Link } from 'react-router'

import React from 'react'
import MyPageComponent from '../../src/js/my_page/MyPageComponent'
import RestaurantListItemComponent from '../../src/js/restaurant_list/RestaurantListItemComponent'

describe('MyPageComponent', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('displays title and name of current user', () => {
    localStorage.setItem('userName', 'Danny')
    let logoutCallback = function() {}
    const component = shallow(<MyPageComponent restaurants={[]} logout={logoutCallback} />)

    expect(component.contains(<Link to="/"><button>restaurants</button></Link>)).toBe(true)
    expect(component.contains(<h1>my page</h1>)).toBe(true)
    expect(component.contains(<span>Danny</span>)).toBe(true)
    expect(component.contains(<button className='logout' onClick={logoutCallback}>logout</button>)).toBe(true)
  })

  it('shows restaurants from props', () => {
    let restaurant = {id: 0, name: 'afuri'}
    let anotherRestaurant = {id: 1, name: 'butagmui'}
    const component = shallow(<MyPageComponent restaurants={[restaurant, anotherRestaurant]} />)

    expect(component.contains(<RestaurantListItemComponent restaurant={restaurant} />))
    expect(component.contains(<RestaurantListItemComponent restaurant={anotherRestaurant} />))
  })

  it('fetches the restaurant if there is no restaurants available in props', () => {
    let props = {
      restaurants: [],
      fetchRestaurants: expect.createSpy()
    }
    expect(props.fetchRestaurants.calls.length).toBe(0)
    mount(<MyPageComponent {...props} />)
    expect(props.fetchRestaurants.calls.length).toBe(1)
  })

  it('does not fetch the restaurant if there are restaurants available in props', () => {
    let props = {
      restaurants: [{id: 0, name: 'afuri'}],
      fetchRestaurants: expect.createSpy()
    }
    expect(props.fetchRestaurants.calls.length).toBe(0)
    mount(<MyPageComponent {...props} />)
    expect(props.fetchRestaurants.calls.length).toBe(0)
  })

})
